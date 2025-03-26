import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {
  SubscribersWorksCardInterface,
  SubscribersWorksCardInterfaceRequest
} from "../../../../../models/subscribers/subscribers-works-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {MainService} from "../../../../../services/main/main.service";
import {SubscriberWorksService} from "../../../../../services/subscribers/subscriber-works.service";
import {SubscriberWorkFilesService} from "../../../../../services/subscribers/subscriber-work-files.service";

@Component({
  selector: 'app-subscriber-work-card',
  templateUrl: './subscriber-work-card.component.html',
  styleUrls: ['./subscriber-work-card.component.scss']
})
export class SubscriberWorkCardComponent {
  subClient$: Subscription = {} as Subscription;
  id: number|null = null;
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'date', name: 'Дата початку роботи'},
    {slug: 'date_end', name: 'Дата завершення роботи'},
    {slug: 'name', name: 'Назва роботи'},
    {slug: 'workers_names', name: 'Хто займався'},
    {slug: 'what_done', name: 'Що зроблено'},
    {slug: 'result', name: 'Результат', type: 'result'},
    {slug: 'fee', name: 'Гонорар'},
    {slug: 'files', name: 'Прикріплені файли', type: 'files'}
  ];
  work: SubscribersWorksCardInterface = {} as SubscribersWorksCardInterface;


  constructor(private route: ActivatedRoute,
              private subscriberWorksService: SubscriberWorksService,
              public subscriberWorkFilesService: SubscriberWorkFilesService,
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
