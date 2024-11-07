import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from "@angular/router";
import {map, Observable, Subscription, switchMap} from "rxjs";
import {ClientsCardInterface} from "../../../../../models/clients/clients-card.interface";
import {ClientsService} from "../../../../../services/clients/clients.service";
import {ClientWorksCardInterface} from "../../../../../models/clients/client-works-card.interface";

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
    {slug: 'email', name: 'E-mail'},
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

  constructor(private route: ActivatedRoute,
              private clientsService: ClientsService) {
  }

  ngOnInit() {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.client = this.clientsService.getOne(params['id']);
          this.works = this.clientsService.getClientWorks(params['id']);
        }
      )
  }
  ngOnDestroy() {
    this.subClient$.unsubscribe();
  }

}
