import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdvocatesCardInterface} from "../../../../models/advocates/advocates-card.interface";
import {
  AdvocateCasesInterface,
  AdvocateCasesInterfaceRequest
} from "../../../../models/advocates/advocate-cases.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";
import {MainService} from "../../../../services/main/main.service";
import {AdvocateCategoryInterfaceRequest} from "../../../../models/advocates/advocate-categories.interface";
import {AdvocateCasePaymentsService} from "../../../../services/advocate/advocate-case-payments.service";
import {AdvocateCaseTblService} from "../../../../services/advocate/advocate-case-tbl.service";

@Component({
  selector: 'app-advocate-case-page',
  templateUrl: './advocate-case-page.component.html',
  styleUrls: ['./advocate-case-page.component.scss']
})
export class AdvocateCasePageComponent  implements OnInit, OnDestroy {
  subAdvocate$: Subscription = {} as Subscription;

  cases: AdvocateCasesInterface[] = [];
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'visit_date', name: 'Дата укладання договору'},
    {slug: 'visit_date_end', name: 'Дата завершення договору'},
    {slug: 'client_full', name: 'Фабула справи', type: 'advcase_client'},
    {slug: 'advocate_name', name: 'Виконавець'},
    {slug: 'advocates_names', name: 'Підписанти'},
    {slug: 'fee', name: 'Гонорар', type: 'payments'}
  ];
  id: number|null = null;

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  // sorting
  sortDirection: string = 'desc';
  sortBy: string = 'visit_date';
  sortVars: {name: string, value: string}[] = [
    {name: 'Дата звернення ↓', value: 'visit_date__desc'},
    {name: 'Дата звернення ↑', value: 'visit_date__asc'},
  ]

  //filtering
  filterVars: {name: string, value: string}[] = [
    {name: 'Статус', value: 'filt_result'}
  ];
  filter: string = '';

  constructor(private route: ActivatedRoute,
              private advocateService: AdvocateService,
              private mainService: MainService,
              public advocateCasePaymentsService: AdvocateCasePaymentsService,
              public advocateCaseTblService: AdvocateCaseTblService) {
  }


  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          const advocateId: number = (id !== 'personal') ? id : sessionStorage.getItem('userId');
          let params_case = {
            pag_size: this.pageSize,
            sort_dir: this.sortDirection,
            sort_field: this.sortBy
          };
          this.advocateService.getAdvocateCases(advocateId, params['category'], params_case).subscribe((list: AdvocateCasesInterfaceRequest) => {
            this.advocateService.getCategoryBySlug(params['category']).subscribe((data: AdvocateCategoryInterfaceRequest) => {
              let data_id: number|null = (data.data.id !== undefined) ? data.data.id.valueOf() : null;
              this.id = data_id;
              this.mainService.setPreloaderState(false);
            });
            this.cases = list.data.map((item: AdvocateCasesInterface) => ({
              ...item,
              client_full: `${item.client_name}, справа: ${item.proc_num}, фабула: ${item.plot}`
            }));
            // this.cases = list.data;
            if (list.all_items !== undefined) {
              this.allItems = list.all_items;
            }
          });
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }

  getList(event: {name: string, value: string} | null = null): void {
    this.mainService.setPreloaderState(true);
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          const advocateId: number = (id !== 'personal') ? id : sessionStorage.getItem('userId');
          if (event !== null) {
            if (event.name === 'pageOffset') {
              this.pageOffset = this.pageSize * (parseInt(event.value)-1);
            }
            if (event.name === 'sort') {
              const sort = event.value.split('__');
              this.sortBy = sort[0];
              this.sortDirection = sort[1];
              this.pageOffset = 0;
            }
            if (event.name.indexOf('filt_') !== -1) {
              this.filter = event.value;
              this.pageOffset = 0;
            }
          }
          let params_case: {
            pag_size?: number,
            pag_offset?: number,
            sort_dir?: string,
            sort_field?: string,
            filt_result?: string,
          } = {
            pag_size: this.pageSize,
            pag_offset: this.pageOffset,
            sort_dir: this.sortDirection,
            sort_field: this.sortBy
          };
          if (this.filter !== '') {
            params_case.filt_result = this.filter;
          }
          this.advocateService.getAdvocateCases(advocateId, params['category'], params_case).subscribe((list: AdvocateCasesInterfaceRequest) => {
            this.advocateService.getCategoryBySlug(params['category']).subscribe((data: AdvocateCategoryInterfaceRequest) => {
              let data_id: number|null = (data.data.id !== undefined) ? data.data.id.valueOf() : null;
              this.id = data_id;
              this.mainService.setPreloaderState(false);
            });
            this.cases = list.data.map((item: AdvocateCasesInterface) => ({
              ...item,
              client_full: `${item.client_name}, справа: ${item.proc_num}, фабула: ${item.plot}`
            }));
            if (list.all_items !== undefined) {
              this.allItems = list.all_items;
            }
          });
        }
      )
  }
}
