import { Injectable } from '@angular/core';
import {SubscribersListInterface} from "../../models/subscribers/subscribers-list.interface";
import {SubscribersCardInterface} from "../../models/subscribers/subscribers-card.interface";
import {SubscribersWorksCardInterface} from "../../models/subscribers/subscribers-works-card.interface";
import {SubscribersWorksListInterface} from "../../models/subscribers/subscribers-works-list.interface";

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  subscribers: Array<SubscribersListInterface|SubscribersCardInterface> = [
    {id: 1, name: 'Стілець', edrpou: 12345678, contract_date: '21.10.2023', responsible_person_id: 2, contact_person_name: 'Юристенко Василь Васильович', contact_person_phone: '+380987654321', director_person_name: 'Стілець Микола Костянтинович', director_person_phone: '+380981234567', legal_address: 'м. Тестове, Північний р-н., вул. Прикладна, буд. 85', actual_address: 'м. Тестове, Північний р-н., вул. Прикладна, буд. 86', last_pay_date: '09.09.2024', fee: 80000, info: 'Компанія по виготовленню найзручніших стільців, на яких дуже зручно сидіти'},
    {id: 2, name: 'Стіл', edrpou: 9876543, contract_date: '10.09.2022', responsible_person_id: 3, contact_person_name: 'Зразковий Ростислав Романович', contact_person_phone: '+380981112233', director_person_name: 'Стіл Петро Вікторович', director_person_phone: '+380989998877', legal_address: 'м. Тестове, Центральний р-н., вул. Тестова, буд. 1', actual_address: 'м. Тестове, Центральний р-н., вул. Тестова, буд. 2', last_pay_date: '19.06.2024', fee: 80000, info: 'Компанія по виготовленню найміцніших столів, які витримають усі купи документів та канцелярії'},
  ];

  works: Array<SubscribersWorksListInterface|SubscribersWorksCardInterface> = [
    {subscriber_id: 0, date: '20.01.2023', what_done: ['Уточнення інформації у клієнта', 'направлено запит', 'очікування документів'], result: 'У процессі'},
    {subscriber_id: 1, date: '20.01.2023', what_done: ['Уточнення інформації у клієнта', 'направлено запит', 'очікування документів'], result: 'У процессі'},
    {subscriber_id: 1, date: '20.01.2023', what_done: ['Уточнення інформації у клієнта', 'направлено запит', 'очікування документів'], result: 'У процессі'},
    {subscriber_id: 1, date: '20.01.2023', what_done: ['Уточнення інформації у клієнта', 'направлено запит', 'очікування документів'], result: 'У процессі'},
    {subscriber_id: 0, date: '20.01.2023', what_done: ['Уточнення інформації у клієнта', 'направлено запит', 'очікування документів'], result: 'У процессі'},
  ]
  constructor() { }

  getList(): SubscribersListInterface[] {
    return this.subscribers;
  }

  getOne(id: number): SubscribersCardInterface {
    return this.subscribers[id]
  }

  getSubscriberWorks(subscriber_id: number): SubscribersWorksCardInterface[] {
    const works:SubscribersWorksCardInterface[] = [];
    let i = 0;
    this.works.forEach((work: SubscribersWorksCardInterface) => {
      if (work.subscriber_id == subscriber_id) {
        works[i] = work;
        i++;
      }
    })
    return works;
  }


}
