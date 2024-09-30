import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from "@angular/router";
import {map, Observable, Subscription, switchMap} from "rxjs";

export interface List {
  visit_date: String,
  where_knows: String,
  full_name: String,
  birth_year: String,
  address: String,
  phone: String,
  visit_purpose: String,
  what_done: String,
  result: String,
  fee: String
}
@Component({
  selector: 'app-clients-card-page',
  templateUrl: './clients-card-page.component.html',
  styleUrls: ['./clients-card-page.component.scss']
})
export class ClientsCardPageComponent implements OnInit, OnDestroy{
  list: Array<List> = [
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Адвокатенко Петро Петрович', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Захистенко Олег Олегович', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Клієнтенко Ольга Іванівна', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Захистенко Олег Олегович', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Тестенко Андрій Андрійович', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Літак Віолета Казимирівна', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Прикладенко Сергій Сергійович', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Клієнтенко Ольга Іванівна', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Абоненко Денис Денисович', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
    {visit_date: '2024-02-20', where_knows: 'Реклама Facebook', full_name: 'Адвокатенко Петро Петрович', birth_year: '1987', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', visit_purpose: 'Причина відвідування', what_done: 'Уточнення інформації у клієнта', result: 'У процессі', fee: '0'},
  ];

  items$: Subscription = {} as Subscription
  item: List = {} as List

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.items$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.item = this.list[params['id']];
        }
      )
  }
  ngOnDestroy() {
    this.items$.unsubscribe();
  }

}
