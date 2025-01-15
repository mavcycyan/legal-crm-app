import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {AdvocateCategoryService} from "../../../services/advocate/advocate-category.service";
import {
  AdvocateCaseInterfaceRequest,
  AdvocateCasesInterface
} from "../../../models/advocates/advocate-cases.interface";

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
    {slug: 'advocate_id', name: 'Відповідальний адвокат', required: true, class: 'w-50', type: 'text'},
    {slug: 'advocate_category_id', name: 'Категорія', required: true, class: 'w-50', type: 'text'},
    {slug: 'visit_date', name: 'Дата заведення', required: true, class: 'w-50', type: 'text'},
    {slug: 'advocates', name: 'Адвокати у справі', required: false, class: 'w-50', type: 'text'},
    {slug: 'proc_num', name: 'Номер справи', required: true, class: 'w-50', type: 'text'},
    {slug: 'plot', name: 'Фабула', required: true, class: 'w-50', type: 'text'},
    {slug: 'fee', name: 'Гонорар', required: true, class: 'w-50', type: 'text'},
    {slug: 'result', name: 'Результат', required: true, class: 'w-50', type: 'text'},
  ];

  constructor(private route: ActivatedRoute,
              public advocateService: AdvocateService,
              public advocateCaseService: AdvocateCategoryService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.advocateService.getAdvocateCase(params['id']).subscribe((advocate: AdvocateCaseInterfaceRequest) => {
              this.data = advocate.data;
              this.isEdit = true;
            });
          }
        }
      )
  }
}
