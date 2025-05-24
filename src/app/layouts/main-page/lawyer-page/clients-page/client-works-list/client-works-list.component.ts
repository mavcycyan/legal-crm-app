import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MainService} from "../../../../../services/main/main.service";
import {combineLatest, Subscription} from "rxjs";
import {
  ClientCardWorksListInterface,
  ClientCardWorksListInterfaceRequest
} from "../../../../../models/clients/client-card-works-list.interface";
import {ClientWorksService} from "../../../../../services/clients/client-works.service";
import {ClientWorkPaymentsService} from "../../../../../services/clients/client-work-payments.service";
import {PagiBackService} from "../../../../../services/helper/pagi.back.service";

@Component({
  selector: 'app-client-works-list',
  templateUrl: './client-works-list.component.html',
  styleUrls: ['./client-works-list.component.scss']
})
export class ClientWorksListComponent implements OnInit, OnDestroy {
  subClient$: Subscription = {} as Subscription;
  id: number|null = null;
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'visit_date', name: 'Дата звернення'},
    {slug: 'visit_date_end', name: 'Дата завершення'},
    {slug: 'visit_purpose', name: 'Причина звернення'},
    {slug: 'workers_names', name: 'Хто займався'},
    {slug: 'fee', name: 'Гонорар', type: 'payments'}
  ];
  works: ClientCardWorksListInterface[] = [];

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;
  startPage: number = 1;

  // sorting
  sortDirection: string = 'desc';
  sortBy: string = 'visit_date';
  sortVars: {name: string, value: string}[] = [
    {name: 'Дата звернення ↓', value: 'visit_date__desc'},
    {name: 'Дата звернення ↑', value: 'visit_date__asc'},
    {name: 'Ім\'я виконавця А-Я', value: 'worker__asc'},
    {name: 'Ім\'я виконавця Я-А', value: 'worker__desc'},
  ]

  //filtering
  filterVars: {name: string, value: string}[] = [
    {name: 'Статус', value: 'filt_result'}
  ];
  filter: string = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientWorksService: ClientWorksService,
              public clientWorkPaymentsService: ClientWorkPaymentsService,
              private mainService: MainService,
              private pagiBackService: PagiBackService) {
  }

  ngOnInit() {
    this.pagiBackService.linksSet('backSingle', window.location.pathname);
    this.mainService.setPreloaderState(true);
    this.subClient$ = combineLatest([
      this.route.params,
      this.route.queryParams
    ]).subscribe(
        ([params, queryParams]: Params[]) => {
          if (queryParams['pageNum'] !== undefined && queryParams['pageNum'] !== '' && queryParams['pageNum'] != '1') {
            this.pageOffset = this.pageSize * (parseInt(queryParams['pageNum']) - 1);
            this.startPage = parseInt(queryParams['pageNum']);
          }
          this.id = params['id'];
          let params_client:any = {
            pag_size: this.pageSize,
            sort_dir: this.sortDirection,
            sort_field: this.sortBy
          };
          if (Object.keys(queryParams).length > 0) {
            Object.keys(queryParams).forEach((item: string, index: number) => {
              if (this.filter === '' && item.indexOf('filt_') !== -1) {
                let obj: Record<string, string> = {};
                obj[item] = Object.values(queryParams)[index];
                params_client = {...params_client, ...obj};
                this.filter = obj[item];
              }
            });
          }
          if (this.pageOffset > 0) {
            params_client.pag_offset = this.pageOffset;
            this.pagiBackService.linksSet('backSingle', window.location.pathname + '?pageNum=' + queryParams['pageNum']);
          }
          this.clientWorksService.getList(params['id'], params_client).subscribe((list: ClientCardWorksListInterfaceRequest) => {
            this.works = list.data.map((item: ClientCardWorksListInterface) => ({
              ...item,
              edit_path: `/edit/lawyer/client_work/${item.id}`
            }));
            if (list.all_items !== undefined) {
              this.allItems = list.all_items;
            }
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }
  ngOnDestroy() {
    this.subClient$.unsubscribe();
  }
  getList(event: {name: string, value: string} | null = null): void {
    let backLinkPathname = '';
    if (this.id !== null) {
      this.mainService.setPreloaderState(true);
      if (event !== null) {
        if (event.name === 'pageOffset') {
          this.pageOffset = this.pageSize * (parseInt(event.value)-1);
          if (this.pageOffset > 0) {
            backLinkPathname += (backLinkPathname === '') ? '?' : '';
            backLinkPathname = backLinkPathname + 'pageNum=' + event.value;
          }
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
      let params_client: any = {
        pag_size: this.pageSize,
        pag_offset: this.pageOffset,
        sort_dir: this.sortDirection,
        sort_field: this.sortBy
      };
      if (this.filter !== '') {
        params_client.filt_result = this.filter;
      }
      if (event !== null) {
        if (event.name.search('srch_') > -1) {
          params_client[event.name] = event.value;
        }
      }
      this.pagiBackService.linksSet('backSingle', window.location.pathname + backLinkPathname);
      this.clientWorksService.getList(this.id, params_client).subscribe((list: ClientCardWorksListInterfaceRequest) => {
        this.works = list.data.map((item: ClientCardWorksListInterface) => ({
          ...item,
          edit_path: `/edit/lawyer/client_work/${item.id}`
        }));
        if (list.all_items !== undefined) {
          this.allItems = list.all_items;
        }
        this.mainService.setPreloaderState(false);
      });
    }
  }
}
