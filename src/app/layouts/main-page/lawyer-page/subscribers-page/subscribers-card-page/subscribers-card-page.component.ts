import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {
  SubscribersCardInterface,
  SubscribersCardInterfaceRequest
} from "../../../../../models/subscribers/subscribers-card.interface";
import {SubscribersWorksCardInterface} from "../../../../../models/subscribers/subscribers-works-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {SubscribersService} from "../../../../../services/subscribers/subscribers.service";
import {ClientsCardInterfaceRequest} from "../../../../../models/clients/clients-card.interface";

@Component({
  selector: 'app-subscribers-card-page',
  templateUrl: './subscribers-card-page.component.html',
  styleUrls: ['./subscribers-card-page.component.scss']
})
export class SubscribersCardPageComponent implements OnInit, OnDestroy{

  subSubscr$: Subscription = {} as Subscription;
  subscriber: SubscribersCardInterface = {} as SubscribersCardInterface;
  subscriberRows: Array<{name: string, slug: string}> = [
    {slug: 'edrpou', name: 'ЄРДПОУ'},
    {slug: 'contract_date', name: 'Дата підписання контракту'},
    {slug: 'responsible_person', name: 'Відповідальна особа'},
    {slug: 'contact_person_name', name: 'Контактна особа'},
    {slug: 'contact_person_phone', name: 'Телефон контактної особи'},
    {slug: 'director_person_name', name: 'Директор'},
    {slug: 'director_person_phone', name: 'Телефон директора'},
    {slug: 'legal_address', name: 'Юридична адреса'},
    {slug: 'actual_address', name: 'Фізична адреса'},
    {slug: 'last_pay_date', name: 'Дата останнього платежу'},
    {slug: 'fee', name: 'Гонорар'},
    {slug: 'info', name: 'Інфо'}
  ];
  works: SubscribersWorksCardInterface[] = [];
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'date', name: 'Дата звернення'},
    {slug: 'what_done', name: 'Що зроблено'},
    {slug: 'result', name: 'Результат'}
  ];

  constructor(private route: ActivatedRoute,
              private subscribersService: SubscribersService) {
  }

  ngOnInit() {
    this.subSubscr$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.subscribersService.getOne(params['id']).subscribe((list: SubscribersCardInterfaceRequest) => {
            this.subscriber = list.data;
            this.works = (list.data.subscriber_works !== undefined) ? list.data.subscriber_works : [];
          });
        }
      )
  }

  ngOnDestroy() {
    this.subSubscr$.unsubscribe();
  }
}
