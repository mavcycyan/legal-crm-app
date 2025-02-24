import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {
  SubscribersWorksCardInterface,
  SubscribersWorksCardInterfaceRequest
} from "../../../models/subscribers/subscribers-works-card.interface";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {SubscriberWorksService} from "../../../services/subscribers/subscriber-works.service";
import {SubscribersService} from "../../../services/subscribers/subscribers.service";
import {
  SubscribersListInterface,
  SubscribersListInterfaceRequest
} from "../../../models/subscribers/subscribers-list.interface";
import {
  AdvocateWorksInterface,
  AdvocateWorksInterfaceRequest
} from "../../../models/advocates/advocate-works.interface";
import {AdvocateWorkService} from "../../../services/advocate/advocate-work.service";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {
  AdvocatesListInterface,
  AdvocatesListInterfaceRequest
} from "../../../models/advocates/advocates-list.interface";
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
    {slug: 'name', name: 'Назва роботи', required: false, class: 'w-50', type: 'text'},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
    {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
  ];

  constructor(private route: ActivatedRoute,
              public advocateWorksService: AdvocateWorkService,
              public advocateCaseService: AdvocateCaseService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.mainService.setPreloaderState(true);
            this.advocateWorksService.getOne(params['id']).subscribe((work: AdvocateWorksInterfaceRequest) => {
              this.data = work.data;
              this.isEdit = true;
              this.mainService.setPreloaderState(false);
            });
          }
        }
      )
    let params = {};
    const userType = sessionStorage.getItem('userType');
    if (userType === '4' && userType !== null) {
      params = {advocate_id: parseInt(userType)}
    }
    this.advocateCaseService.getList(params).subscribe((data: AdvocateCasesInterfaceRequest) => {
      const cases = data.data;
      this.fields.map((field: FormFieldsInterface) => {
        if (field.slug === 'advocate_case_id') {
          cases.forEach((cas: AdvocateCasesInterface, index: number) => {
            if (field.choises !== undefined) {
              field.choises[index] = {label: cas.proc_num.toString(), value: cas.id.toString()};
            }
          });
        }
      });
    });
  }
}
