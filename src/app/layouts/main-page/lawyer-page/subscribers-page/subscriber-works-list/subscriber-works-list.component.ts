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
    {slug: 'date_end', name: 'Дата завершення роботи'},
    {slug: 'name', name: 'Назва роботи'},
    {slug: 'worker', name: 'Хто займався'},
    {slug: 'fee', name: 'Гонорар', type: 'payments'}
  ];
  works: SubscribersWorksListInterface[] = [];

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  // sorting
  sortDirection: string = 'desc';
  sortBy: string = 'date';
  sortVars: {name: string, value: string}[] = [
    {name: 'Дата початку ↓', value: 'date__desc'},
    {name: 'Дата завершення ↑', value: 'date__asc'},
    {name: 'Ім\'я виконавця А-Я', value: 'worker__asc'},
    {name: 'Ім\'я виконавця Я-А', value: 'worker__desc'},
  ]

  //filtering
  filterVars: {name: string, value: string}[] = [
    {name: 'Статус', value: 'filt_result'}
  ];
  filter: string = '';


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
            pag_size: this.pageSize,
            sort_dir: this.sortDirection,
            sort_field: this.sortBy
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
        if (event.name === 'sort') {
          const sort = event.value.split('__');
          this.sortBy = sort[0];
          this.sortDirection = sort[1];
          this.pageOffset = 0;
        }
        if (event.name.indexOf('filt_') !== -1) {
          this.filter = event.value;
          this.pageOffset = 0;
        }
      }
      let params_client: {
        pag_size?: number,
        pag_offset?: number,
        sort_dir?: string,
        sort_field?: string,
        filt_result?: string,
      } = {
        pag_size: this.pageSize,
        pag_offset: this.pageOffset,
        sort_dir: this.sortDirection,
        sort_field: this.sortBy
      };
      if (this.filter !== '') {
        params_client.filt_result = this.filter;
      }
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
