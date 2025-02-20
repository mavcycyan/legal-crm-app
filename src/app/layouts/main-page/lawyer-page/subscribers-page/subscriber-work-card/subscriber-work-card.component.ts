import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {
  SubscribersWorksCardInterface,
  SubscribersWorksCardInterfaceRequest
} from "../../../../../models/subscribers/subscribers-works-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {MainService} from "../../../../../services/main/main.service";
import {SubscriberWorksService} from "../../../../../services/subscribers/subscriber-works.service";

@Component({
  selector: 'app-subscriber-work-card',
  templateUrl: './subscriber-work-card.component.html',
  styleUrls: ['./subscriber-work-card.component.scss']
})
export class SubscriberWorkCardComponent {
  subClient$: Subscription = {} as Subscription;
  id: number|null = null;
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'date', name: 'Дата початку роботи'},
    {slug: 'name', name: 'Назва роботи'},
    {slug: 'what_done', name: 'Що зроблено'},
    {slug: 'result', name: 'Результат'},
    {slug: 'fee', name: 'Гонорар'}
  ];
  work: SubscribersWorksCardInterface = {} as SubscribersWorksCardInterface;


  constructor(private route: ActivatedRoute,
              private subscriberWorksService: SubscriberWorksService,
              private mainService: MainService) {
  }

  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['subscriber_work'];
          this.subscriberWorksService.getOne(params['subscriber_work']).subscribe((list: SubscribersWorksCardInterfaceRequest) => {
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
