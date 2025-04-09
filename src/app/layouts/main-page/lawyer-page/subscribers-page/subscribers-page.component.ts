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
    {slug: 'name', name: 'Назва підприємства'},
    {slug: 'edrpou', name: 'ЄДРПОУ'},
    {slug: 'contract_date', name: 'Дата укладення договору'},
    {slug: 'director_person_full', name: 'Директор (телефон)'},
    {slug: 'contact_person_full', name: 'Контактна особа (телефон)'},
    {slug: 'accountant_person_full', name: 'Бухгалтер (телефон)'},
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
      sort_field: this.sortBy,
      with_pending: '1'
    };
    this.listSub$ = this.subscribersService.getList(params).subscribe((list: SubscribersListInterfaceRequest) => {
      this.list = list.data.map((item: SubscribersListInterface) => {
        let retVar = {
          ...item,
          director_person_full: '',
          contact_person_full: '',
          accountant_person_full: ''
        };
        if (item.director_person_name !== null && item.director_person_name !== '') {
          retVar.director_person_full += item.director_person_name;
        }
        if (item.director_person_phone !== null && item.director_person_phone !== '') {
          retVar.director_person_full += (retVar.director_person_full !== '') ? ' ' : '';
          retVar.director_person_full += `(${item.director_person_phone})`;
        }
        if (item.contact_person_name !== null && item.contact_person_name !== '') {
          retVar.contact_person_full += item.contact_person_name;
        }
        if (item.contact_person_phone !== null && item.contact_person_phone !== '') {
          retVar.contact_person_full += (retVar.contact_person_full !== '') ? ' ' : '';
          retVar.contact_person_full += `(${item.contact_person_phone})`;
        }
        if (item.accountant_person_name !== null && item.accountant_person_name !== '') {
          retVar.accountant_person_full += item.accountant_person_name;
        }
        if (item.accountant_person_phone !== null && item.accountant_person_phone !== '') {
          retVar.accountant_person_full += (retVar.accountant_person_full !== '') ? ' ' : '';
          retVar.accountant_person_full += `(${item.accountant_person_phone})`;
        }
        return retVar;
      });
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
    let params: any = {
      pag_size: this.pageSize,
      pag_offset: this.pageOffset,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy,
      with_pending: '1'
    };
    if (event !== null) {
      if (event.name.search('srch_') > -1) {
        params[event.name] = event.value;
      }
    }
    this.listSub$ = this.subscribersService.getList(params).subscribe((list: SubscribersListInterfaceRequest) => {
      this.list = list.data.map((item: SubscribersListInterface) => {
        let retVar = {
          ...item,
          director_person_full: '',
          contact_person_full: '',
          accountant_person_full: ''
        };
        if (item.director_person_name !== null && item.director_person_name !== '') {
          retVar.director_person_full += item.director_person_name;
        }
        if (item.director_person_phone !== null && item.director_person_phone !== '') {
          retVar.director_person_full += (retVar.director_person_full !== '') ? ' ' : '';
          retVar.director_person_full += `(${item.director_person_phone})`;
        }
        if (item.contact_person_name !== null && item.contact_person_name !== '') {
          retVar.contact_person_full += item.contact_person_name;
        }
        if (item.contact_person_phone !== null && item.contact_person_phone !== '') {
          retVar.contact_person_full += (retVar.contact_person_full !== '') ? ' ' : '';
          retVar.contact_person_full += `(${item.contact_person_phone})`;
        }
        if (item.accountant_person_name !== null && item.accountant_person_name !== '') {
          retVar.accountant_person_full += item.accountant_person_name;
        }
        if (item.accountant_person_phone !== null && item.accountant_person_phone !== '') {
          retVar.accountant_person_full += (retVar.accountant_person_full !== '') ? ' ' : '';
          retVar.accountant_person_full += `(${item.accountant_person_phone})`;
        }
        return retVar;
      });
      if (list.all_items !== undefined) {
        this.allItems = list.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
}
