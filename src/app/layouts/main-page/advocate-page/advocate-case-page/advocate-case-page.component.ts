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
import {ClientCardWorksListInterface} from "../../../../models/clients/client-card-works-list.interface";
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
    {slug: 'visit_date', name: 'Дата звернення'},
    {slug: 'client_full', name: 'Відомості про клієнта', type: 'advcase_client'},
    {slug: 'advocate_name', name: 'Виконавець'},
    {slug: 'fee', name: 'Гонорар', type: 'payments'},
    {slug: 'result', name: 'Статус', type: 'result'}
  ];
  id: number|null = null;

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  // sorting
  sortDirection: string = 'desc';
  sortBy: string = 'visit_date';

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
          const id = this.route.parent?.snapshot.params['id'];
          const advocateId: number = (id !== 'personal') ? id : 1;
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
          const id = this.route.parent?.snapshot.params['id'];
          const advocateId: number = (id !== 'personal') ? id : 1;
          if (event !== null) {
            if (event.name === 'pageOffset') {
              this.pageOffset = this.pageSize * (parseInt(event.value)-1);
            }
          }
          let params_case = {
            pag_size: this.pageSize,
            pag_offset: this.pageOffset,
            sort_dir: this.sortDirection,
            sort_field: this.sortBy
          };
          this.advocateService.getAdvocateCases(advocateId, params['category'], params_case).subscribe((list: AdvocateCasesInterfaceRequest) => {
            this.advocateService.getCategoryBySlug(params['category']).subscribe((data: AdvocateCategoryInterfaceRequest) => {
              let data_id: number|null = (data.data.id !== undefined) ? data.data.id.valueOf() : null;
              this.id = data_id;
              this.mainService.setPreloaderState(false);
            });
            this.cases = list.data;
            if (list.all_items !== undefined) {
              this.allItems = list.all_items;
            }
          });
        }
      )
  }
}
