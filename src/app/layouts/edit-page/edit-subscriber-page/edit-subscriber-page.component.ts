import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {SubscribersService} from "../../../services/subscribers/subscribers.service";
import {
  SubscribersCardInterface,
  SubscribersCardInterfaceRequest
} from "../../../models/subscribers/subscribers-card.interface";
import {MainService} from "../../../services/main/main.service";
import {
  SubscribersListInterface,
  SubscribersListInterfaceRequest
} from "../../../models/subscribers/subscribers-list.interface";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {
  AdvocatesListInterface,
  AdvocatesListInterfaceRequest
} from "../../../models/advocates/advocates-list.interface";

@Component({
  selector: 'app-edit-subscriber-page',
  templateUrl: './edit-subscriber-page.component.html',
  styleUrls: ['./edit-subscriber-page.component.scss']
})
export class EditSubscriberPageComponent implements OnInit{
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: SubscribersCardInterface = {} as SubscribersCardInterface;
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'name', name: 'Назва', required: true, class: 'w-100', type: 'text'},
    {slug: 'responsible_person_id', name: 'Відповідальний адвокат', required: false, class: 'w-100', type: 'select', choises: []},
    {slug: 'edrpou', name: 'ЄДРПОУ', required: false, class: 'w-50', type: 'text'},
    {slug: 'contract_date', name: 'Дата укладення угоди', required: false, class: 'w-50', type: 'date'},
    {slug: 'contact_person_name', name: 'Ім\'я контактної особи', required: false, class: 'w-50', type: 'text'},
    {slug: 'contact_person_phone', name: 'Телефон контактної особи', required: false, class: 'w-50', type: 'text'},
    {slug: 'director_person_name', name: 'Ім\'я директор', required: false, class: 'w-50', type: 'text'},
    {slug: 'director_person_phone', name: 'Телефон директора', required: false, class: 'w-50', type: 'text'},
    {slug: 'legal_address', name: 'Юр. адреса', required: false, class: 'w-100', type: 'text'},
    {slug: 'actual_address', name: 'Фактична адреса', required: false, class: 'w-100', type: 'text'},
    {slug: 'info', name: 'Інформація про абонента', required: false, class: 'w-100', type: 'textarea'},
  ];

  constructor(private route: ActivatedRoute,
              public mainService: MainService,
              public subscribersService: SubscribersService,
              public advocatesService: AdvocateService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.mainService.setPreloaderState(true);
            this.subscribersService.getOne(params['id']).subscribe((subscriber: SubscribersCardInterfaceRequest) => {
              this.data = subscriber.data;
              this.isEdit = true;
              this.mainService.setPreloaderState(false);

            });
          }
        }
      )
    this.advocatesService.getList().subscribe((data: AdvocatesListInterfaceRequest) => {
      const advocates = data.data;
      this.fields.map((field: FormFieldsInterface) => {
        if (field.slug === 'responsible_person_id') {
          advocates.forEach((advocate: AdvocatesListInterface, index: number) => {
            if (field.choises !== undefined) {
              field.choises[index] = {label: advocate.name.toString(), value: advocate.id.toString()};
            }
          });
        }
      });
    });
  }
}
