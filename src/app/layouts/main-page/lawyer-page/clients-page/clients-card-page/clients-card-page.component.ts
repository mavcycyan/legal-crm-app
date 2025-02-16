import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {ClientsCardInterface, ClientsCardInterfaceRequest} from "../../../../../models/clients/clients-card.interface";
import {ClientsService} from "../../../../../services/clients/clients.service";
import {ClientWorksCardInterface} from "../../../../../models/clients/client-works-card.interface";
import {MainService} from "../../../../../services/main/main.service";

@Component({
  selector: 'app-clients-card-page',
  templateUrl: './clients-card-page.component.html',
  styleUrls: ['./clients-card-page.component.scss']
})
export class ClientsCardPageComponent implements OnInit, OnDestroy{

  subClient$: Subscription = {} as Subscription;
  client: ClientsCardInterface = {} as ClientsCardInterface;
  clientRows: Array<{name: string, slug: string}> = [
    {slug: 'where_knows', name: 'Звідки дізнались'},
    {slug: 'birthday', name: 'Рік народження'},
    {slug: 'address', name: 'Адреса'},
    {slug: 'phone', name: 'Телефон'}
  ];
  works: ClientWorksCardInterface[] = [];
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'visit_date', name: 'Дата звернення'},
    {slug: 'visit_purpose', name: 'Причина звернення'},
    {slug: 'what_done', name: 'Що зроблено'},
    {slug: 'result', name: 'Результат'},
    {slug: 'fee', name: 'Гонорар'}
  ];
  id: number|null = null;

  constructor(private route: ActivatedRoute,
              private clientsService: ClientsService,
              private mainService: MainService) {
  }

  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.clientsService.getOne(params['id']).subscribe((list: ClientsCardInterfaceRequest) => {
            this.client = list.data;
            if (list.data.client_works !== undefined) {
              this.works = list.data.client_works.map((item: ClientWorksCardInterface) => ({
                ...item,
                edit_path: `/edit/lawyer/client_work/${item.id}`
              }));
            }
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }
  ngOnDestroy() {
    this.subClient$.unsubscribe();
  }

}
