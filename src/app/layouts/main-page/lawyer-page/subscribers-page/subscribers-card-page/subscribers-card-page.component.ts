import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SubscribersCardInterface} from "../../../../../models/subscribers/subscribers-card.interface";
import {SubscribersWorksCardInterface} from "../../../../../models/subscribers/subscribers-works-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {SubscribersService} from "../../../../../services/subscribers/subscribers.service";

@Component({
  selector: 'app-subscribers-card-page',
  templateUrl: './subscribers-card-page.component.html',
  styleUrls: ['./subscribers-card-page.component.scss']
})
export class SubscribersCardPageComponent implements OnInit, OnDestroy{

  subSubscr$: Subscription = {} as Subscription;
  subscriber: SubscribersCardInterface = {} as SubscribersCardInterface;
  works: SubscribersWorksCardInterface[] = [];

  constructor(private route: ActivatedRoute,
              private subscribersService: SubscribersService) {
  }

  ngOnInit() {
    this.subSubscr$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.subscriber = this.subscribersService.getOne(params['id']);
          this.works = this.subscribersService.getSubscriberWorks(params['id']);
        }
      )
  }

  ngOnDestroy() {
    this.subSubscr$.unsubscribe();
  }
}
