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
  works: ClientWorksCardInterface[] = [];

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
