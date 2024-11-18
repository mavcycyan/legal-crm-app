import { Injectable } from '@angular/core';
import {
  ClientsCardInterface,
  ClientsCardInterfaceRequest,
  ClientsCardWorkListInterface
} from "../../models/clients/clients-card.interface";
import {ClientWorksListInterface} from "../../models/clients/client-works-list.interface";
import {ClientWorksCardInterface} from "../../models/clients/client-works-card.interface";
import {ClientsListInterface, ClientsListInterfaceRequest} from "../../models/clients/clients-list.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  // clients: Array<ClientsListInterface|ClientsCardInterface> = [
  //   {id: 0, where_knows: 'Реклама Facebook', full_name: 'Адвокатенко Петро Петрович', birthday: '1987-02-10', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567', email: 'test@test.client.sam'},
  //   {id: 1, where_knows: 'Реклама Facebook', full_name: 'Захистенко Олег Олегович', birthday: '1987-03-10', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380982345678', email: 'test@test.client.sam'},
  //   {id: 2, where_knows: 'Реклама Facebook', full_name: 'Клієнтенко Ольга Іванівна', birthday: '1987-02-20', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380983456789', email: 'test@test.client.sam'},
  //   {id: 3, where_knows: 'Реклама Facebook', full_name: 'Тестенко Андрій Андрійович', birthday: '1987-05-30', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380989876543', email: 'test@test.client.sam'},
  //   {id: 4, where_knows: 'Реклама Facebook', full_name: 'Літак Віолета Казимирівна', birthday: '1987-10-14', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380988765432', email: 'test@test.client.sam'},
  //   {id: 5, where_knows: 'Реклама Facebook', full_name: 'Прикладенко Сергій Сергійович', birthday: '1987-01-10', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380987654321', email: 'test@test.client.sam'},
  //   {id: 6, where_knows: 'Реклама Facebook', full_name: 'Абоненко Денис Денисович', birthday: '1987-02-10', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380980001122', email: 'test@test.client.sam'},
  // ];

  // works: Array<ClientWorksListInterface|ClientWorksCardInterface> = [
  //   {client_id: 0, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі', fee: '5000/5000'},
  //   {client_id: 1, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі', fee: '0/2000'},
  //   {client_id: 2, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі', fee: '1500/3000'},
  //   {client_id: 1, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: true}], result: 'У процессі', fee: '250/250'},
  //   {client_id: 3, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі', fee: '5500/8000'},
  //   {client_id: 4, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі', fee: '2500/3000'},
  //   {client_id: 5, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі', fee: '1000/4500'},
  //   {client_id: 2, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: true}, {data: 'очікування документів', pending: false}], result: 'У процессі', fee: '6000/6000'},
  //   {client_id: 6, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі', fee: '0/2300'},
  //   {client_id: 0, visit_date: '2024-02-20', visit_purpose: 'Причина відвідування', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі', fee: '5000/9000'},
  // ];
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<ClientsListInterfaceRequest> {
    return this.httpClient.get<ClientsListInterfaceRequest>('http://api.crm.local/api/client_works');
  }
  getOne(id: number): Observable<ClientsCardInterfaceRequest> {
    return this.httpClient.get<ClientsCardInterfaceRequest>(`http://api.crm.local/api/clients/${id}`);
  }

}
