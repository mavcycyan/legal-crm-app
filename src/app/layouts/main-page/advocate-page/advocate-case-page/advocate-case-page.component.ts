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
import {
  AdvocateCategoriesInterface, AdvocateCategoriesInterfaceRequest,
  AdvocateCategoryInterfaceRequest
} from "../../../../models/advocates/advocate-categories.interface";
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
  subcategories: AdvocateCategoriesInterface[] = [];
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'visit_date', name: 'Дата укладання договору'},
    {slug: 'visit_date_end', name: 'Дата завершення договору'},
    {slug: 'client_full', name: 'Фабула справи', type: 'advcase_client'},
    {slug: 'advocate_name', name: 'Виконавець'},
    {slug: 'advocates_names', name: 'Підписанти'},
    {slug: 'fee', name: 'Гонорар', type: 'payments'}
  ];
  id: number|null = null;
  advId: number|null = null;

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

  responseType: string = '';

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
          this.advId = id;
          let params_case = {
            pag_size: this.pageSize,
            sort_dir: this.sortDirection,
            sort_field: this.sortBy
          };
          this.advocateService.getAdvocateCases(advocateId, params['category'], params_case).subscribe((list: AdvocateCasesInterfaceRequest|AdvocateCategoriesInterfaceRequest) => {
            this.advocateService.getCategoryBySlug(params['category']).subscribe((data: AdvocateCategoryInterfaceRequest) => {
              let data_id: number|null = (data.data.id !== undefined) ? data.data.id.valueOf() : null;
              this.id = data_id;
              this.mainService.setPreloaderState(false);
            });
            if (list.response_extras !== undefined && list.response_extras.response !== undefined) {
              this.responseType = list.response_extras.response;
            }
            if (this.isAdvocateCategoriesResponse(list)) {
              this.subcategories = list.data;
            } else if (this.isAdvocateCasesResponse(list)) {
              this.cases = list.data.map((item: AdvocateCasesInterface) => {
                let cl_full: string = '';
                if (item.clients_names !== null && item.clients_names !== '') {
                  cl_full += item.clients_names;
                }
                if (cl_full !== '' && item.proc_num !== '' && item.proc_num !== null) {
                  cl_full += '; ';
                }
                if (item.proc_num !== null && item.proc_num !== '') {
                  cl_full += `справа: ${item.proc_num}`;
                }
                if (cl_full !== '' && item.plot !== '' && item.plot !== null) {
                  cl_full += '; ';
                }
                if (item.plot !== null && item.plot !== '') {
                  cl_full += `фабула: ${item.plot}`;
                }
                return ({
                  ...item,
                  client_full: cl_full
                })
              });
              if (list.all_items !== undefined) {
                this.allItems = list.all_items;
              }
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
          this.advId = id;
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
          let params_case: any = {
            pag_size: this.pageSize,
            pag_offset: this.pageOffset,
            sort_dir: this.sortDirection,
            sort_field: this.sortBy
          };
          if (this.filter !== '') {
            params_case.filt_result = this.filter;
          }
          if (event !== null) {
            if (event.name.search('srch_') > -1) {
              params_case[event.name] = event.value;
            }
          }
          this.advocateService.getAdvocateCases(advocateId, params['category'], params_case).subscribe((list: AdvocateCasesInterfaceRequest|AdvocateCategoriesInterfaceRequest) => {
            this.advocateService.getCategoryBySlug(params['category']).subscribe((data: AdvocateCategoryInterfaceRequest) => {
              let data_id: number|null = (data.data.id !== undefined) ? data.data.id.valueOf() : null;
              this.id = data_id;
              this.mainService.setPreloaderState(false);
            });
            if (list.response_extras !== undefined && list.response_extras.response !== undefined) {
              this.responseType = list.response_extras.response;
            }
            if (this.isAdvocateCategoriesResponse(list)) {
              this.subcategories = list.data;
            } else if (this.isAdvocateCasesResponse(list)) {
              this.cases = list.data.map((item: AdvocateCasesInterface) => {
                let cl_full: string = '';
                if (item.clients_names !== null && item.clients_names !== '') {
                  cl_full += item.clients_names;
                }
                if (cl_full !== '' && item.proc_num !== '' && item.proc_num !== null) {
                  cl_full += '; ';
                }
                if (item.proc_num !== null && item.proc_num !== '') {
                  cl_full += `справа: ${item.proc_num}`;
                }
                if (cl_full !== '' && item.plot !== '' && item.plot !== null) {
                  cl_full += '; ';
                }
                if (item.plot !== null && item.plot !== '') {
                  cl_full += `фабула: ${item.plot}`;
                }
                return ({
                  ...item,
                  client_full: cl_full
                })
              });
              // this.cases = list.data;
              if (list.all_items !== undefined) {
                this.allItems = list.all_items;
              }
            }
          });
        }
      )
  }

  isAdvocateCasesResponse(data: any): data is AdvocateCasesInterfaceRequest {
    return data && data.response_extras.response === 'cases';
  }
  isAdvocateCategoriesResponse(data: any): data is AdvocateCategoriesInterfaceRequest {
    return data && data.response_extras.response === 'subcategories';
  }
}
