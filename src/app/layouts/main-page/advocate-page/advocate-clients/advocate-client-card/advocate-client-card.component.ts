import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserInterface, UserInterfaceRequest} from "../../../../../models/auth/user.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../../../services/auth/user.service";
import {MainService} from "../../../../../services/main/main.service";
import {AdvocateClientsService} from "../../../../../services/advocate/advocate-clients.service";
import {ClientsListInterfaceRequest} from "../../../../../models/clients/clients-list.interface";
import {ClientsCardInterface, ClientsCardInterfaceRequest} from "../../../../../models/clients/clients-card.interface";

@Component({
  selector: 'app-advocate-client-card',
  templateUrl: './advocate-client-card.component.html',
  styleUrls: ['./advocate-client-card.component.scss']
})
export class AdvocateClientCardComponent implements OnInit, OnDestroy {
  subUser$: Subscription = {} as Subscription;

  client: ClientsCardInterface = {} as ClientsCardInterface;
  id: number|null = null;

  constructor(private route: ActivatedRoute,
              private advocateClientsService: AdvocateClientsService,
              private mainService: MainService) {
  }


  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.subUser$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.advocateClientsService.getOne(params['id']).subscribe((client: ClientsCardInterfaceRequest) => {
            this.id = params['id'];
            this.client = client.data;
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }


  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
  }
}
