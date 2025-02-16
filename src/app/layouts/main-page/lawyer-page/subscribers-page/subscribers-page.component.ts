import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  SubscribersListInterface,
  SubscribersListInterfaceRequest
} from "../../../../models/subscribers/subscribers-list.interface";
import {SubscribersService} from "../../../../services/subscribers/subscribers.service";
import {Subscription} from "rxjs";
import {MainService} from "../../../../services/main/main.service";

@Component({
  selector: 'app-subscribers-page',
  templateUrl: './subscribers-page.component.html',
  styleUrls: ['./subscribers-page.component.scss']
})
export class SubscribersPageComponent implements OnInit, OnDestroy{
  list: SubscribersListInterface[] = []
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'name', name: 'Назва пдприємства'},
    {slug: 'edrpou', name: 'ЄДРПОУ'},
    {slug: 'contract_date', name: 'Дата укладення контракту'},
    {slug: 'responsible_person', name: 'Відповідальна особа'},
    {slug: 'contact_person_name', name: 'Контактна особа'},
    {slug: 'last_pay_date', name: 'Дата останнього платежу'},
    {slug: 'fee', name: 'Гонорар'}
  ];
  private listSub$: Subscription = new Subscription();

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  constructor(private subscribersService: SubscribersService,
              private mainService: MainService) {
  }
  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.listSub$ = this.subscribersService.getList({pag_size: this.pageSize}).subscribe((list: SubscribersListInterfaceRequest) => {
      this.list = list.data;
      if (list.all_items !== undefined) {
        this.allItems = list.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
  ngOnDestroy(): void {
    this.listSub$.unsubscribe();
  }

  getList(event: number | null = null): void {
    this.mainService.setPreloaderState(true);
    this.pageOffset = (event !== null) ? this.pageSize * (event-1) : 0;
    this.listSub$ = this.subscribersService.getList({pag_size: this.pageSize, pag_offset: this.pageOffset}).subscribe((list: SubscribersListInterfaceRequest) => {
      this.list = list.data;
      if (list.all_items !== undefined) {
        this.allItems = list.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
}
