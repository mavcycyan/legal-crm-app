import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ClientsService} from "../../../../../services/clients/clients.service";
import {ClientsListInterface, ClientsListInterfaceRequest} from "../../../../../models/clients/clients-list.interface";
import {MainService} from "../../../../../services/main/main.service";
import {PagiBackService} from "../../../../../services/helper/pagi.back.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-clients-all',
  templateUrl: './clients-all.component.html',
  styleUrls: ['./clients-all.component.scss']
})
export class ClientsAllComponent  implements OnInit, OnDestroy{
  list: ClientsListInterface[] = [];
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'full_name', name: 'П.І.Б.'},
    {slug: 'visit_date', name: 'Дата першого звернення'},
    {slug: 'visit_purpose', name: 'Причина першого звернення'},
    {slug: 'phone', name: 'Телефон'},
    {slug: 'address', name: 'Адреса'}
  ];
  private listSub$: Subscription = new Subscription();

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;
  startPage: number = 1;

  // sorting
  sortDirection: string = 'asc';
  sortBy: string = 'full_name';
  sortVars: {name: string, value: string}[] = [
    {name: 'Ім\'я клієнта А-Я', value: 'full_name__asc'},
    {name: 'Ім\'я клієнта Я-А', value: 'full_name__desc'},
  ]

  //filtering
  filterVars: {name: string, value: string}[] = [
    {name: 'Статус', value: 'filtcust_pending'}
  ];
  filter: string = '';

  constructor(private clientsService: ClientsService,
              private mainService: MainService,
              private pagiBackService: PagiBackService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.pagiBackService.linksDry();
    this.pagiBackService.linksSet('backList', window.location.pathname);
    this.mainService.setPreloaderState(true);
    this.route.queryParams.subscribe((queryParams: Params) => {
      if (queryParams['pageNum'] !== undefined && queryParams['pageNum'] !== '' && queryParams['pageNum'] != '1') {
        this.pageOffset = this.pageSize * (parseInt(queryParams['pageNum']) - 1);
        this.startPage = parseInt(queryParams['pageNum']);
      }
      let params:any = {
        pag_size: this.pageSize,
        sort_dir: this.sortDirection,
        sort_field: this.sortBy,
        with_pending: '1'
      };
      if (this.pageOffset > 0) {
        params.pag_offset = this.pageOffset;
        this.pagiBackService.linksSet('backList', window.location.pathname + '?pageNum=' + queryParams['pageNum']);
      }
      this.listSub$ = this.clientsService.getClientsList(params).subscribe((list: ClientsListInterfaceRequest) => {
        this.list = list.data.map((item: ClientsListInterface) => ({
          ...item,
          custom_path: `${item.id}`
        }));
        if (list.all_items !== undefined) {
          this.allItems = list.all_items;
        }
        this.mainService.setPreloaderState(false);
      });
    })
  }
  ngOnDestroy(): void {
    this.listSub$.unsubscribe();
  }

  getList(event: {name: string, value: string} | null = null): void {
    let backLinkPathname = '';
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
      if (event.name.indexOf('filtcust_') !== -1) {
        this.filter = event.value;
        this.pageOffset = 0;
      }
    }
    let params:any = {
      pag_size: this.pageSize,
      pag_offset: this.pageOffset,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy,
      with_pending: '1'
    };
    if (this.filter !== '') {
      params.filtcust_pending = this.filter;
    }
    if (event !== null) {
      if (event.name.search('srch_') > -1) {
        params[event.name] = event.value;
      }
    }
    this.pagiBackService.linksSet('backList', window.location.pathname + backLinkPathname);
    this.listSub$ = this.clientsService.getClientsList(params).subscribe((list: ClientsListInterfaceRequest) => {
      this.list = list.data.map((item: ClientsListInterface) => ({
        ...item,
        custom_path: `${item.id}`
      }));
      if (list.all_items !== undefined) {
        this.allItems = list.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
}
