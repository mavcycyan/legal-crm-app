import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ClientsService} from "../../../../../services/clients/clients.service";
import {ClientsListInterface, ClientsListInterfaceRequest} from "../../../../../models/clients/clients-list.interface";
import {MainService} from "../../../../../services/main/main.service";

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

  constructor(private clientsService: ClientsService,
              private mainService: MainService) {
  }
  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.mainService.setEditBtnData({type: 'lawyer_clients', id: null});
    this.mainService.setEditBtnSecondaryData({type: '', id: null});
    this.listSub$ = this.clientsService.getClientsList().subscribe((list: ClientsListInterfaceRequest) => {
      this.list = list.data.map((item: ClientsListInterface) => ({
        ...item,
        custom_path: `${item.id}`
      }));
      this.mainService.setPreloaderState(false);
    });
  }
  ngOnDestroy(): void {
    this.listSub$.unsubscribe();
  }
}
