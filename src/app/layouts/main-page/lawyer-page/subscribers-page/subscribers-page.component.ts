import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  SubscribersListInterface,
  SubscribersListInterfaceRequest
} from "../../../../models/subscribers/subscribers-list.interface";
import {SubscribersService} from "../../../../services/subscribers/subscribers.service";
import {Subscription} from "rxjs";
import {MainService} from "../../../../services/main/main.service";
import {SubscriberPaymentsService} from "../../../../services/subscribers/subscriber-payments.service";

@Component({
  selector: 'app-subscribers-page',
  templateUrl: './subscribers-page.component.html',
  styleUrls: ['./subscribers-page.component.scss']
})
export class SubscribersPageComponent implements OnInit, OnDestroy{
  list: SubscribersListInterface[] = []
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'name', name: 'Назва пдприємства'},
    {slug: 'edrpou', name: 'ЄДРПОУ'},
    {slug: 'contract_date', name: 'Дата укладення договору'},
    {slug: 'responsible_person', name: 'Відповідальна особа'},
    {slug: 'contact_person_full', name: 'Контактна особа'},
    {slug: 'accountant_person_full', name: 'Бухгалтер'},
    {slug: 'fee', name: 'Платежі', type: 'payments'}
  ];
  private listSub$: Subscription = new Subscription();

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  // sorting
  sortDirection: string = 'desc';
  sortBy: string = 'contract_date';

  constructor(private subscribersService: SubscribersService,
              private mainService: MainService,
              public subscriberPaymentsService: SubscriberPaymentsService) {
  }
  ngOnInit() {
    this.mainService.setPreloaderState(true);
    let params = {
      pag_size: this.pageSize,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy
    };
    this.listSub$ = this.subscribersService.getList(params).subscribe((list: SubscribersListInterfaceRequest) => {
      this.list = list.data.map((item: SubscribersListInterface) => ({
        ...item,
        contact_person_full: `${item.contact_person_name} (${item.contact_person_phone})`,
        accountant_person_full: `${item.accountant_person_name} (${item.accountant_person_phone})`
      }));
      if (list.all_items !== undefined) {
        this.allItems = list.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
  ngOnDestroy(): void {
    this.listSub$.unsubscribe();
  }

  getList(event: {name: string, value: string} | null = null): void {
    this.mainService.setPreloaderState(true);
    if (event !== null) {
      if (event.name === 'pageOffset') {
        this.pageOffset = this.pageSize * (parseInt(event.value)-1);
      }
    }
    let params = {
      pag_size: this.pageSize,
      pag_offset: this.pageOffset,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy
    };
    this.listSub$ = this.subscribersService.getList(params).subscribe((list: SubscribersListInterfaceRequest) => {
      this.list = list.data;
      if (list.all_items !== undefined) {
        this.allItems = list.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
}
