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

  constructor(private subscribersService: SubscribersService,
              private mainService: MainService) {
  }
  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.listSub$ = this.subscribersService.getList().subscribe((list: SubscribersListInterfaceRequest) => {
      this.list = list.data;
      this.mainService.setPreloaderState(false);
    });
  }
  ngOnDestroy(): void {
    this.listSub$.unsubscribe();
  }
}
