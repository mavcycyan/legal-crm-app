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

  constructor(private clientsService: ClientsService,
              private mainService: MainService) {
  }
  ngOnInit(): void {
    this.mainService.setEditBtnData({type: 'lawyer_client_work', id: null});
    this.listSub$ = this.clientsService.getList().subscribe((list: ClientWorksListInterfaceRequest) => {
      this.list = list.data.map((item: ClientWorksListInterface) => ({
        ...item,
        custom_path: `/lawyer/clients/${item.client_id}#work-${item.id}`
      }));
    });
  }
  ngOnDestroy(): void {
    this.listSub$.unsubscribe();
  }
}
