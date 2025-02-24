import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {MainService} from "../../../../../services/main/main.service";
import {
  SubscribersWorksListInterface,
  SubscribersWorksListInterfaceRequest
} from "../../../../../models/subscribers/subscribers-works-list.interface";
import {SubscriberWorksService} from "../../../../../services/subscribers/subscriber-works.service";
import {SubscriberPaymentsService} from "../../../../../services/subscribers/subscriber-payments.service";
import {SubscriberWorkPaymentsService} from "../../../../../services/subscribers/subscriber-work-payments.service";

@Component({
  selector: 'app-subscriber-works-list',
  templateUrl: './subscriber-works-list.component.html',
  styleUrls: ['./subscriber-works-list.component.scss']
})
export class SubscriberWorksListComponent implements OnInit, OnDestroy {
  subClient$: Subscription = {} as Subscription;
  id: number|null = null;
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'date', name: 'Дата початку роботи'},
    {slug: 'name', name: 'Назва роботи'},
    {slug: 'result', name: 'Результат', type: 'result'},
    {slug: 'fee', name: 'Гонорар', type: 'payments'}
  ];
  works: SubscribersWorksListInterface[] = [];

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;


  constructor(private route: ActivatedRoute,
              private subscriberWorksService: SubscriberWorksService,
              private mainService: MainService,
              public subscriberWorkPaymentsService: SubscriberWorkPaymentsService) {
  }

  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          let params_client = {
            pag_size: this.pageSize
          };
          this.subscriberWorksService.getList(params['id'], params_client).subscribe((list: SubscribersWorksListInterfaceRequest) => {
            this.works = list.data.map((item: SubscribersWorksListInterface) => ({
              ...item,
              edit_path: `/edit/lawyer/subscriber_work/${item.id}`
            }));
            if (list.all_items !== undefined) {
              this.allItems = list.all_items;
            }
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }
  ngOnDestroy() {
    this.subClient$.unsubscribe();
  }
  getList(event: {name: string, value: string} | null = null): void {
    if (this.id !== null) {
      this.mainService.setPreloaderState(true);
      if (event !== null) {
        if (event.name === 'pageOffset') {
          this.pageOffset = this.pageSize * (parseInt(event.value)-1);
        }
      }
      let params_client = {
        pag_size: this.pageSize,
        pag_offset: this.pageOffset,
      };
      this.subscriberWorksService.getList(this.id, params_client).subscribe((list: SubscribersWorksListInterfaceRequest) => {
        this.works = list.data.map((item: SubscribersWorksListInterface) => ({
          ...item,
          edit_path: `/edit/lawyer/subscriber_work/${item.id}`
        }));
        if (list.all_items !== undefined) {
          this.allItems = list.all_items;
        }
        this.mainService.setPreloaderState(false);
      });
    }
  }
}
