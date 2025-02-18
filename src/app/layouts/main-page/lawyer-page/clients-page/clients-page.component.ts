import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientsService} from "../../../../services/clients/clients.service";
import {Subscription} from "rxjs";
import {
  ClientWorksListInterface,
  ClientWorksListInterfaceRequest
} from "../../../../models/clients/client-works-list.interface";
import {MainService} from "../../../../services/main/main.service";


@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent implements OnInit, OnDestroy{
  list: ClientWorksListInterface[] = [];
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'visit_date', name: 'Дата звернення'},
    {slug: 'where_knows', name: 'Звідки дізнались'},
    {slug: 'full_name', name: 'П.І.Б.'},
    {slug: 'phone', name: 'Телефон'},
    {slug: 'visit_purpose', name: 'Причина звернення'},
    {slug: 'result', name: 'Результат'},
    {slug: 'fee', name: 'Гонорар'}
  ];
  private listSub$: Subscription = new Subscription();

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
    {name: 'Ім\'я клієнта А-Я', value: 'clients.full_name__asc'},
    {name: 'Ім\'я клієнта Я-А', value: 'clients.full_name__desc'},
  ]

  //filtering

  constructor(private clientsService: ClientsService,
              private mainService: MainService) {
  }
  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    let params = {
      pag_size: this.pageSize,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy
    };
    this.listSub$ = this.clientsService.getList(params).subscribe((list: ClientWorksListInterfaceRequest) => {
      this.list = list.data.map((item: ClientWorksListInterface) => ({
        ...item,
        custom_path: `/lawyer/clients/${item.client_id}#work-${item.id}`
      }));
      if (list.all_items !== undefined) {
        this.allItems = list.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
  ngOnDestroy(): void {
    this.listSub$.unsubscribe();
  }

  getList(event: {name: string, value: string} | null = null): void {
    this.mainService.setPreloaderState(true);
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
    }
    let params = {
      pag_size: this.pageSize,
      pag_offset: this.pageOffset,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy
    };
    this.listSub$ = this.clientsService.getList(params).subscribe((list: ClientWorksListInterfaceRequest) => {
      this.list = list.data.map((item: ClientWorksListInterface) => ({
        ...item,
        custom_path: `/lawyer/clients/${item.client_id}#work-${item.id}`
      }));
      if (list.all_items !== undefined) {
        this.allItems = list.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
}
