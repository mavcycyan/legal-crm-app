import { Component } from '@angular/core';
import {Observable, Subscription, switchMap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {
  AdvocateWorksInterface
} from "../../../models/advocates/advocate-works.interface";
import {AdvocateWorkService} from "../../../services/advocate/advocate-work.service";
import {AdvocateCaseService} from "../../../services/advocate/advocate-case.service";
import {MainService} from "../../../services/main/main.service";
import {AdvocateWorkFilesService} from "../../../services/advocate/advocate-work-files.service";
import {AdvocateService} from "../../../services/advocate/advocate.service";

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
  caseId: number|null = null;
  advocatesList: {description: string, id: string}[] = [];
  caseWorksExtra: {} = {};
  fields: FormFieldsInterface[] = [
    {slug: 'advocate_case_id', name: 'Справа', required: true, class: 'hidden', type: 'hidden'},
    {slug: 'date', name: 'Дата початку роботи', required: true, class: 'w-50', type: 'date'},
    {slug: 'date_end', name: 'Дата завершення роботи', required: false, class: 'w-50', type: 'date'},
    {slug: 'name', name: 'Назва роботи', required: false, class: 'w-50', type: 'text'},
    {slug: 'worker', name: 'Виконавець', required: false, class: 'w-50', type: 'select_dd_multy', choises_dd: []},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
    {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
  ];

  constructor(private route: ActivatedRoute,
              public advocateWorksService: AdvocateWorkService,
              public advocateCaseService: AdvocateCaseService,
              public advocateService: AdvocateService,
              public advocateWorkFilesService: AdvocateWorkFilesService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    let qparams = {};
    const userType = sessionStorage.getItem('userType');
    if (userType === '4' && userType !== null) {
      qparams = {advocate_id: parseInt(userType)}
    }
    this.subClient$ = this.advocateCaseService.getList(qparams).pipe(
      switchMap((casesResponse) => {
        const cases = casesResponse.data;


        return this.advocateService.getList();
      }),
      switchMap((advocatesResponse) => {
        const advocates = advocatesResponse.data;

        this.advocatesList = advocates.map(advocate => ({
          description: advocate.name.toString(),
          id: advocate.id.toString()
        }));
        return this.route.params;
      }),
      switchMap((params: Params) => {
          this.caseWorksExtra = {advocate_case_id: params['case_id']};
          this.caseId = params['case_id'];
          if (params['id'] !== undefined) {
            this.fields = [
              {slug: 'advocate_case_id', name: 'Справа', required: true, class: 'hidden', type: 'hidden'},
              {slug: 'date', name: 'Дата початку роботи', required: true, class: 'w-50', type: 'date'},
              {slug: 'date_end', name: 'Дата завершення роботи', required: false, class: 'w-50', type: 'date'},
              {slug: 'name', name: 'Назва роботи', required: false, class: 'w-50', type: 'text'},
              {slug: 'worker', name: 'Виконавець', required: false, class: 'w-50', type: 'select_dd_multy', choises_dd: this.advocatesList},
              {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
              {slug: 'files_upload', name: 'Прикріплені файли', required: true, class: 'w-50', type: 'filemodal' },
              {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
            ];
            return this.advocateWorksService.getOne(params['id']);
          }
          const advocateField = this.fields.find(field => field.slug === 'worker');
          if (advocateField) {
            advocateField.choises_dd = this.advocatesList;
          }
          this.mainService.setPreloaderState(false);
          return new Observable<never>();
      })
    ).subscribe(
      (work) => {
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
