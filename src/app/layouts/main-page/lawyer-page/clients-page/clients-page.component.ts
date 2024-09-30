import { Component } from '@angular/core';

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
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent {
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
}
