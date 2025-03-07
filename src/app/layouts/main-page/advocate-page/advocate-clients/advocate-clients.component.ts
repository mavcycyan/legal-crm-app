import { Component } from '@angular/core';
import {ClientsListInterface, ClientsListInterfaceRequest} from "../../../../models/clients/clients-list.interface";
import {Subscription} from "rxjs";
import {ClientsService} from "../../../../services/clients/clients.service";
import {MainService} from "../../../../services/main/main.service";
import {AdvocateClientsService} from "../../../../services/advocate/advocate-clients.service";

@Component({
  selector: 'app-advocate-clients',
  templateUrl: './advocate-clients.component.html',
  styleUrls: ['./advocate-clients.component.scss']
})
export class AdvocateClientsComponent {
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

  // sorting
  sortDirection: string = 'asc';
  sortBy: string = 'full_name';

  constructor(private advocateClientsService: AdvocateClientsService,
              private mainService: MainService) {
  }
  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    let params = {
      pag_size: this.pageSize,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy,
      with_pending: '1'
    };

    this.listSub$ = this.advocateClientsService.getList(params).subscribe((list: ClientsListInterfaceRequest) => {
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
  ngOnDestroy(): void {
    this.listSub$.unsubscribe();
  }

  getList(event: {name: string, value: string} | null = null): void {
    this.mainService.setPreloaderState(true);
    if (event !== null) {
      if (event.name === 'pageOffset') {
        this.pageOffset = this.pageSize * (parseInt(event.value)-1);
      }
    }
    let params = {
      pag_size: this.pageSize,
      pag_offset: this.pageOffset,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy,
      with_pending: '1'
    };
    this.listSub$ = this.advocateClientsService.getList(params).subscribe((list: ClientsListInterfaceRequest) => {
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
