import { Component } from '@angular/core';
import {Observable, Subscription, switchMap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {
  AdvocateWorksInterface,
  AdvocateWorksInterfaceRequest
} from "../../../models/advocates/advocate-works.interface";
import {AdvocateWorkService} from "../../../services/advocate/advocate-work.service";
import {AdvocateCaseService} from "../../../services/advocate/advocate-case.service";
import {
  AdvocateCasesInterface,
  AdvocateCasesInterfaceRequest
} from "../../../models/advocates/advocate-cases.interface";
import {MainService} from "../../../services/main/main.service";

@Component({
  selector: 'app-edit-advocate-work',
  templateUrl: './edit-advocate-work.component.html',
  styleUrls: ['./edit-advocate-work.component.scss']
})
export class EditAdvocateWorkComponent {
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: AdvocateWorksInterface = {} as AdvocateWorksInterface;
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'advocate_case_id', name: 'Справа', required: true, class: 'w-100', type: 'select', choises: []},
    {slug: 'date', name: 'Дата початку роботи', required: true, class: 'w-50', type: 'date'},
    {slug: 'date_end', name: 'Дата завершення роботи', required: false, class: 'w-50', type: 'date'},
    {slug: 'name', name: 'Назва роботи', required: false, class: 'w-50', type: 'text'},
    {slug: 'worker', name: 'Виконавець', required: false, class: 'w-50', type: 'text'},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
    {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
  ];

  constructor(private route: ActivatedRoute,
              public advocateWorksService: AdvocateWorkService,
              public advocateCaseService: AdvocateCaseService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    let qparams = {};
    const userType = sessionStorage.getItem('userType');
    if (userType === '4' && userType !== null) {
      qparams = {advocate_id: parseInt(userType)}
    }
    this.subClient$ = this.advocateCaseService.getList(qparams).pipe(
      switchMap((casesResponse) => {
        const cases = casesResponse.data;

        let caseField = this.fields.find(field => field.slug === 'advocate_case_id');
        if (caseField) {
          caseField.choises = cases.map(caseItem => ({
            label: caseItem.proc_num.toString(),
            value: caseItem.id.toString()
          }))
        }

        return this.route.params;
      }),
      switchMap((params: Params) => {
          if (params['id'] !== undefined) {
            this.mainService.setPreloaderState(true);
            return this.advocateWorksService.getOne(params['id']);
          }
          return new Observable();
      })
    ).subscribe(
      (work: any) => {
        this.data = work.data;
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
