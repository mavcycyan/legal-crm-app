import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {
  ClientWorksCardInterface,
  ClientWorksCardInterfaceRequest
} from "../../../../../models/clients/client-works-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {ClientWorksService} from "../../../../../services/clients/client-works.service";
import {MainService} from "../../../../../services/main/main.service";
import {ClientWorkFilesService} from "../../../../../services/clients/client-work-files.service";

@Component({
  selector: 'app-client-work-card',
  templateUrl: './client-work-card.component.html',
  styleUrls: ['./client-work-card.component.scss']
})
export class ClientWorkCardComponent {
  subClient$: Subscription = {} as Subscription;
  id: number|null = null;
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'visit_date', name: 'Дата звернення'},
    {slug: 'visit_date_end', name: 'Дата завершення'},
    {slug: 'visit_purpose', name: 'Причина звернення'},
    {slug: 'worker', name: 'Хто займався'},
    {slug: 'what_done', name: 'Що зроблено'},
    {slug: 'result', name: 'Результат', type: 'result'},
    {slug: 'fee', name: 'Гонорар'},
    {slug: 'files', name: 'Прикріплені файли', type: 'files'}
  ];
  work: ClientWorksCardInterface = {} as ClientWorksCardInterface;


  constructor(private route: ActivatedRoute,
              private clientWorksService: ClientWorksService,
              public clientWorkFilesService: ClientWorkFilesService,
              private mainService: MainService) {
  }

  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['client_work'];
          this.clientWorksService.getOne(params['client_work']).subscribe((list: ClientWorksCardInterfaceRequest) => {
            this.work = list.data;
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }
  ngOnDestroy() {
    this.subClient$.unsubscribe();
  }

}
