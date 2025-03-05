import { Component } from '@angular/core';
import {Observable, Subscription, switchMap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {
  AdvocateCaseInterfaceRequest,
  AdvocateCasesInterface
} from "../../../models/advocates/advocate-cases.interface";
import {MainService} from "../../../services/main/main.service";
import {
  AdvocatesListInterface,
  AdvocatesListInterfaceRequest
} from "../../../models/advocates/advocates-list.interface";
import {
  AdvocateCategoriesInterface,
  AdvocateCategoriesInterfaceRequest
} from "../../../models/advocates/advocate-categories.interface";
import {AdvocateCaseService} from "../../../services/advocate/advocate-case.service";
import {
  AdvocateCasePaymentsService
} from "../../../services/advocate/advocate-case-payments.service";
import {ClientsService} from "../../../services/clients/clients.service";
import {ClientsListInterface, ClientsListInterfaceRequest} from "../../../models/clients/clients-list.interface";

@Component({
  selector: 'app-edit-advocate-case',
  templateUrl: './edit-advocate-case.component.html',
  styleUrls: ['./edit-advocate-case.component.scss']
})
export class EditAdvocateCaseComponent {
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: AdvocateCasesInterface = {} as AdvocateCasesInterface;
  advocatesList: {label: string, value: string}[] = [];
  advocateCatsList: {label: string, value: string}[] = [];
  clientsList: {label: string, value: string}[] = [];
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'advocate_id', name: 'Відповідальний адвокат', required: true, class: 'w-50', type: 'select', choises: []},
    {slug: 'advocate_category_id', name: 'Категорія', required: true, class: 'w-50', type: 'select', choises: []},
    {slug: 'client_id', name: 'Клієнт', required: true, class: 'w-100', type: 'select', choises: []},
    {slug: 'proc_num', name: 'Номер справи', required: true, class: 'w-50', type: 'text'},
    {slug: 'visit_date', name: 'Дата укладання договору', required: true, class: 'w-50', type: 'date'},
    {slug: 'visit_date_end', name: 'Дата завершення договору', required: false, class: 'w-50', type: 'date'},
    {slug: 'advocates', name: 'Адвокати у справі (для вибору декількох затисніть Ctrl)', required: false, class: 'w-100', type: 'select_multy', choises: []},
    {slug: 'plot', name: 'Фабула (короткий опис)', required: true, class: 'w-100', type: 'text'},
    {slug: 'fee', name: 'Гонорар', required: false, class: 'w-50', type: 'number'},
    {slug: 'payment', name: 'Перший внесок', required: false, class: 'w-50', type: 'number'},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
    {slug: 'plot_big', name: 'Фабула (повний опис)', required: false, class: 'w-100', type: 'textarea'},
  ];

  constructor(private route: ActivatedRoute,
              public advocateService: AdvocateService,
              public advocateCaseService: AdvocateCaseService,
              public advocateCasePaymentsService: AdvocateCasePaymentsService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.advocateService.getList().pipe(
      switchMap((advocatesResponse) => {
        const advocates = advocatesResponse.data;

        this.advocatesList = advocates.map(advocate => ({
          label: advocate.name.toString(),
          value: advocate.id.toString()
        }));

        return this.advocateService.getCategories()
      }),
      switchMap((data: AdvocateCategoriesInterfaceRequest) => {
        const categories = data.data;

        this.advocateCatsList = categories.map(category => ({
          label: category.name.toString(),
          value: category.id.toString()
        }));

        return this.advocateService.getClients();
      }),
      switchMap((data: ClientsListInterfaceRequest) => {
        const clients = data.data;

        this.clientsList = clients.map(client => ({
          label: client.full_name.toString(),
          value: client.id.toString()
        }));

        return this.route.params;
      }),
      switchMap((params: Params) => {
        if (params['id'] !== undefined) {
          this.mainService.setPreloaderState(true);
          this.fields = [
            {slug: 'advocate_id', name: 'Відповідальний адвокат', required: true, class: 'w-50', type: 'select', choises: this.advocatesList},
            {slug: 'advocate_category_id', name: 'Категорія', required: true, class: 'w-50', type: 'select', choises: this.advocateCatsList},
            {slug: 'client_id', name: 'Клієнт', required: true, class: 'w-50', type: 'select', choises: this.clientsList},
            {slug: 'proc_num', name: 'Номер справи', required: true, class: 'w-50', type: 'text'},
            {slug: 'visit_date', name: 'Дата заведення', required: true, class: 'w-50', type: 'date'},
            {slug: 'visit_date_end', name: 'Дата завершення договору', required: false, class: 'w-50', type: 'date'},
            {slug: 'advocates', name: 'Адвокати у справі (для вибору декількох затисніть Ctrl)', required: false, class: 'w-100', type: 'select_multy', choises: this.advocatesList},
            {slug: 'plot', name: 'Фабула', required: true, class: 'w-100', type: 'text'},
            {slug: 'payments_edit', name: 'Гонорар', required: true, class: 'w-50', type: 'paymodal'},
            {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
            {slug: 'plot_big', name: 'Фабула (повний опис)', required: false, class: 'w-100', type: 'textarea'},
          ];
          return this.advocateService.getAdvocateCase(params['id'])
        }
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
        const clientField = this.fields.find(field => field.slug === 'client_id');
        if (clientField) {
          clientField.choises = this.clientsList;
        }
        return new Observable();
      })
    ).subscribe(
      (caseItem: any) => {
        this.data = caseItem.data;
        this.isEdit = true;
        this.mainService.setPreloaderState(false);
      },
      (error) => {
        console.error('Error:', error);
        this.mainService.setPreloaderState(false);
      }
    )
  }
}
