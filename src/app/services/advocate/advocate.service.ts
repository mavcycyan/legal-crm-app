import { Injectable } from '@angular/core';
import {AdvocatesListInterface} from "../../models/advocates/advocates-list.interface";
import {AdvocateCategoriesInterface} from "../../models/advocates/advocate-categories.interface";
import {AdvocateCasesInterface} from "../../models/advocates/advocate-cases.interface";
import {AdvocateWorksInterface} from "../../models/advocates/advocate-works.interface";
import {AdvocateCardComponent} from "../../layouts/main-page/advocate-page/advocate-card/advocate-card.component";
import {AdvocatesCardInterface} from "../../models/advocates/advocates-card.interface";

@Injectable({
  providedIn: 'root'
})
export class AdvocateService {

  advocates: AdvocatesListInterface[] = [
    {id: 0, email: 'advocate@example.com', password: 'advocate', full_name: 'Адвокатенко Петро Петрович', birthday: '1987-02-10', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380981234567'},
    {id: 1, email: 'advocate2@example.com', password: 'advocate2', full_name: 'Захистенко Олег Олегович', birthday: '1987-03-10', address: 'м. Тестове, вул. Тестова, буд. 55, кв. 10', phone: '+380982345678'},
  ];

  categories: AdvocateCategoriesInterface[] = [
    {id: 0, name: 'кримінальне провадження', slug: 'criminal_proceedings'},
    {id: 1, name: 'адмін провадження (КУАП)', slug: 'administrator_of_proceedings'},
    {id: 2, name: 'господарчі справи', slug: 'business_affairs'},
    {id: 3, name: 'цивільні справи', slug: 'civil_cases'},
    {id: 4, name: 'адмінистративне судочинство', slug: 'admin_proceedings'}
  ];

  cases: AdvocateCasesInterface[] = [
    {id: 0, visit_date: '20-10-2024', advocates: [0, 1], proc_num: '11111', plot: 'Фабула справи', fee: '8000', pays: [{date: '20-02-2024', summ: 500}, {date: '22-03-2024', summ: 500}, {date: '22-04-2024', summ: 500}], result: 'в процессі', category: 'criminal_proceedings', advocate_id: 0},
    {id: 1, visit_date: '20-10-2024', advocates: [0], proc_num: '11111', plot: 'Фабула справи', fee: '8000', pays: [{date: '20-02-2024', summ: 500}], result: 'в процессі', category: 'criminal_proceedings', advocate_id: 1},
    {id: 2, visit_date: '20-10-2024', advocates: [1], proc_num: '11111', plot: 'Фабула справи', fee: '8000', pays: [{date: '20-02-2024', summ: 500}, {date: '22-03-2024', summ: 500}], result: 'в процессі', category: 'criminal_proceedings', advocate_id: 0},
    {id: 3, visit_date: '20-10-2024', advocates: [0, 1], proc_num: '11111', plot: 'Фабула справи', fee: '8000', pays: [{date: '20-02-2024', summ: 500}], result: 'в процессі', category: 'administrator_of_proceedings', advocate_id: 1},
    {id: 4, visit_date: '20-10-2024', advocates: [0], proc_num: '11111', plot: 'Фабула справи', fee: '8000', pays: [{date: '20-02-2024', summ: 500}, {date: '22-03-2024', summ: 500}], result: 'в процессі', category: 'business_affairs', advocate_id: 0},
  ];

  works: AdvocateWorksInterface[] = [
    {case_id: 0, date: '20.01.2023', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі'},
    {case_id: 1, date: '20.01.2023', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: true}], result: 'У процессі'},
    {case_id: 1, date: '20.01.2023', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі'},
    {case_id: 1, date: '20.01.2023', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: false}, {data: 'очікування документів', pending: false}], result: 'У процессі'},
    {case_id: 0, date: '20.01.2023', what_done: [{data: 'Уточнення інформації у клієнта', pending: false}, {data: 'направлено запит', pending: true}, {data: 'очікування документів', pending: false}], result: 'У процессі'},
  ]

  constructor() { }

  getList(): AdvocatesListInterface[] {
    return this.advocates;
  }

  getOne(id: number): AdvocatesCardInterface {
    return this.advocates[id];
  }

  getCategories(): AdvocateCategoriesInterface[] {
    return this.categories;
  }

  getAdvocateCases(advocate_id: number, category_slug: string): AdvocateCasesInterface[] {
    const cases: AdvocateCasesInterface[] = [];
    let i = 0;
    this.cases.forEach((_case: AdvocateCasesInterface) => {
      if (_case.advocate_id == advocate_id && _case.category == category_slug) {
        cases[i] = _case;
        i++;
      }
    });
    return cases;
  }

  getAdvocateCase(case_id: number): AdvocateCasesInterface {
    return this.cases[case_id];
  }

  getAdvocateWorks(case_id: number): AdvocateWorksInterface[] {
    const works: AdvocateWorksInterface[] = [];
    let i = 0;
    this.works.forEach((work: AdvocateWorksInterface) => {
      if (work.case_id == case_id) {
        works[i] = work;
        i++;
      }
    });
    return works;
  }

}
