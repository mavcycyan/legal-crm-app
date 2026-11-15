import { Component } from '@angular/core';
import {Observable, Subscription, switchMap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {AdvocateCasesInterface} from "../../../models/advocates/advocate-cases.interface";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {MainService} from "../../../services/main/main.service";
import {LawyerAdvcaseService} from "../../../services/lawyer/lawyer-advcase.service";
import {AdvocateCategoriesInterfaceRequest} from "../../../models/advocates/advocate-categories.interface";
import {ClientsListInterfaceRequest} from "../../../models/clients/clients-list.interface";

@Component({
  selector: 'app-edit-lawyer-advcase',
  templateUrl: './edit-lawyer-advcase.component.html',
  styleUrls: ['./edit-lawyer-advcase.component.scss']
})
export class EditLawyerAdvcaseComponent {
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: AdvocateCasesInterface = {} as AdvocateCasesInterface;
  advocatesList: {label: string, value: string}[] = [];
  advocateCatsList: {label: string, value: string}[] = [];
  clientsList: {id: string, description: string}[] = [];
  fields: FormFieldsInterface[] = [
    {slug: 'advocate_id', name: 'Відповідальний адвокат', required: true, class: 'w-50', type: 'select', choises: []},
    {slug: 'advocate_category_id', name: 'Категорія', required: true, class: 'w-50', type: 'select', choises: []},
    {slug: 'clients', name: 'Клієнт', required: false, class: 'w-100', type: 'select_dd_multy', choises_dd: []},
    {slug: 'proc_num', name: 'Номер справи', required: false, class: 'w-50', type: 'text'},
    {slug: 'visit_date', name: 'Дата укладання договору', required: true, class: 'w-50', type: 'date'},
    {slug: 'visit_date_end', name: 'Дата завершення договору', required: false, class: 'w-50', type: 'date'},
    {slug: 'advocates', name: 'Адвокати у справі (для вибору декількох затисніть Ctrl)', required: false, class: 'w-100', type: 'select_multy', choises: []},
    {slug: 'plot', name: 'Фабула (короткий опис)', required: true, class: 'w-100', type: 'text'},
    {slug: 'fee', name: 'Гонорар', required: false, class: 'w-50', type: 'number'},
    {slug: 'payment', name: 'Перший внесок', required: false, class: 'w-50', type: 'number'},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
    {slug: 'plot_big', name: 'Фабула (повний опис)', required: false, class: 'w-100', type: 'textarea'},
  ];

  constructor(public lawyerAdvcaseService: LawyerAdvcaseService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.lawyerAdvcaseService.getAdvocatesList().pipe(
      switchMap((advocatesResponse) => {
        const advocates = advocatesResponse.data;

        this.advocatesList = advocates.map(advocate => ({
          label: advocate.name.toString(),
          value: advocate.id.toString()
        }));

        return this.lawyerAdvcaseService.getCategories({'type': 'formlist'})
      }),
      switchMap((data: AdvocateCategoriesInterfaceRequest) => {
        const categories = data.data;

        this.advocateCatsList = categories.map(category => ({
          label: category.name.toString(),
          value: category.id.toString()
        }));

        let params = {
          sort_dir: 'asc',
          sort_field: 'full_name'
        };
        return this.lawyerAdvcaseService.getClients(params);
      }),
      switchMap((data: ClientsListInterfaceRequest) => {
        const clients = data.data;

        this.clientsList = clients.map(client => ({
          description: client.full_name.toString(),
          id: client.id.toString()
        }));

        const advocateField = this.fields.find(field => field.slug === 'advocate_id');
        if (advocateField) {
          advocateField.choises = this.advocatesList;
        }
        const advocateSecondField = this.fields.find(field => field.slug === 'advocates');
        if (advocateSecondField) {
          advocateSecondField.choises = this.advocatesList;
        }
        const catField = this.fields.find(field => field.slug === 'advocate_category_id');
        if (catField) {
          catField.choises = this.advocateCatsList;
        }
        const clientField = this.fields.find(field => field.slug === 'clients');
        if (clientField) {
          clientField.choises_dd = this.clientsList;
        }
        this.mainService.setPreloaderState(false);
        return new Observable<never>();
      }),
    ).subscribe(
      (clientItem) => {
        this.mainService.setPreloaderState(false);
      },
      (error) => {
        console.error('Error:', error);
        this.mainService.setPreloaderState(false);
      }
    )
  }

}
