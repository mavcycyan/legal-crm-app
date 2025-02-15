import { Component } from '@angular/core';
import {Subscription} from "rxjs";
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

@Component({
  selector: 'app-edit-advocate-case',
  templateUrl: './edit-advocate-case.component.html',
  styleUrls: ['./edit-advocate-case.component.scss']
})
export class EditAdvocateCaseComponent {
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: AdvocateCasesInterface = {} as AdvocateCasesInterface;
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'advocate_id', name: 'Відповідальний адвокат', required: true, class: 'w-50', type: 'select', choises: []},
    {slug: 'advocate_category_id', name: 'Категорія', required: true, class: 'w-50', type: 'select', choises: []},
    {slug: 'visit_date', name: 'Дата заведення', required: true, class: 'w-50', type: 'date'},
    {slug: 'proc_num', name: 'Номер справи', required: true, class: 'w-50', type: 'text'},
    {slug: 'advocates', name: 'Адвокати у справі (для вибору декількох затисніть Ctrl)', required: false, class: 'w-100', type: 'select_multy', choises: []},
    {slug: 'plot', name: 'Фабула', required: true, class: 'w-100', type: 'text'},
    {slug: 'fee', name: 'Гонорар', required: false, class: 'w-50', type: 'text'},
    {slug: 'payment', name: 'Перший внесок', required: false, class: 'w-50', type: 'text'},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
  ];

  constructor(private route: ActivatedRoute,
              public advocateService: AdvocateService,
              public advocateCaseService: AdvocateCaseService,
              public advocateCasePaymentsService: AdvocateCasePaymentsService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.advocateService.getList().subscribe((data: AdvocatesListInterfaceRequest) => {
      const advocates = data.data;
      this.fields.map((field: FormFieldsInterface) => {
        if (field.slug === 'advocate_id') {
          advocates.forEach((advocate: AdvocatesListInterface, index: number) => {
            if (field.choises !== undefined) {
              field.choises[index] = {label: advocate.name.toString(), value: advocate.id.toString()};
            }
          });
        }
        if (field.slug === 'advocates') {
          advocates.forEach((advocate: AdvocatesListInterface, index: number) => {
            if (field.choises !== undefined) {
              field.choises[index] = {label: advocate.name.toString(), value: advocate.id.toString()};
            }
          });
        }
      });
    });
    this.advocateService.getCategories().subscribe((data: AdvocateCategoriesInterfaceRequest) => {
      const categories = data.data;
      this.fields.map((field: FormFieldsInterface) => {
        if (field.slug === 'advocate_category_id') {
          categories.forEach((category: AdvocateCategoriesInterface, index: number) => {
            if (field.choises !== undefined) {
              field.choises[index] = {label: category.name.toString(), value: category.id.toString()};
            }
          });
        }
      });
    });
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.mainService.setPreloaderState(true);
            this.advocateService.getAdvocateCase(params['id']).subscribe((advocate: AdvocateCaseInterfaceRequest) => {
              this.data = advocate.data;
              this.isEdit = true;
              this.fields = [
                {slug: 'advocate_id', name: 'Відповідальний адвокат', required: true, class: 'w-50', type: 'select', choises: []},
                {slug: 'advocate_category_id', name: 'Категорія', required: true, class: 'w-50', type: 'select', choises: []},
                {slug: 'visit_date', name: 'Дата заведення', required: true, class: 'w-50', type: 'date'},
                {slug: 'proc_num', name: 'Номер справи', required: true, class: 'w-50', type: 'text'},
                {slug: 'advocates', name: 'Адвокати у справі (для вибору декількох затисніть Ctrl)', required: false, class: 'w-100', type: 'select_multy', choises: []},
                {slug: 'plot', name: 'Фабула', required: true, class: 'w-100', type: 'text'},
                {slug: 'payments_edit', name: 'Виплати', required: true, class: 'w-50', type: 'paymodal'},
                {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
              ];
              this.mainService.setPreloaderState(false);
            });
          }
        }
      )
  }
}
