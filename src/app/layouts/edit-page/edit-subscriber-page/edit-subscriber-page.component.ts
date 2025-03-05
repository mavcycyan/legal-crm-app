import {Component, OnInit} from '@angular/core';
import {Observable, Subscription, switchMap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {SubscribersService} from "../../../services/subscribers/subscribers.service";
import {
  SubscribersCardInterface,
  SubscribersCardInterfaceRequest
} from "../../../models/subscribers/subscribers-card.interface";
import {MainService} from "../../../services/main/main.service";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {
  AdvocatesListInterface,
  AdvocatesListInterfaceRequest
} from "../../../models/advocates/advocates-list.interface";
import {SubscriberPaymentsService} from "../../../services/subscribers/subscriber-payments.service";

@Component({
  selector: 'app-edit-subscriber-page',
  templateUrl: './edit-subscriber-page.component.html',
  styleUrls: ['./edit-subscriber-page.component.scss']
})
export class EditSubscriberPageComponent implements OnInit{
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: SubscribersCardInterface = {} as SubscribersCardInterface;
  advocatesList: {label: string, value: string}[] = [];
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'name', name: 'Назва', required: false, class: 'w-100', type: 'text'},
    {slug: 'responsible_person_id', name: 'Відповідальний адвокат', required: false, class: 'w-100', type: 'select', choises: []},
    {slug: 'edrpou', name: 'ЄДРПОУ', required: false, class: 'w-50', type: 'text'},
    {slug: 'contract_date', name: 'Дата укладення договору', required: false, class: 'w-50', type: 'date'},
    {slug: 'contact_person_name', name: 'Ім\'я контактної особи', required: false, class: 'w-50', type: 'text'},
    {slug: 'contact_person_phone', name: 'Телефон контактної особи', required: false, class: 'w-50', type: 'text'},
    {slug: 'director_person_name', name: 'Ім\'я директор', required: false, class: 'w-50', type: 'text'},
    {slug: 'director_person_phone', name: 'Телефон директора', required: false, class: 'w-50', type: 'text'},
    {slug: 'accountant_person_name', name: 'Ім\'я бухгалтера', required: false, class: 'w-50', type: 'text'},
    {slug: 'accountant_person_phone', name: 'Телефон бухгалтера', required: false, class: 'w-50', type: 'text'},
    {slug: 'legal_address', name: 'Юр. адреса', required: false, class: 'w-100', type: 'text'},
    {slug: 'actual_address', name: 'Фактична адреса', required: false, class: 'w-100', type: 'text'},
    {slug: 'fee', name: 'Платежі', required: false, class: 'w-50', type: 'number'},
    {slug: 'payment', name: 'Перший внесок', required: false, class: 'w-50', type: 'number'},
    {slug: 'info', name: 'Інформація про абонента', required: false, class: 'w-100', type: 'textarea'},
  ];

  constructor(private route: ActivatedRoute,
              public mainService: MainService,
              public subscribersService: SubscribersService,
              public subscriberPaymentsService: SubscriberPaymentsService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.subscribersService.getAdvocates().pipe(
      switchMap(advocatesResponse  => {
        const advocates = advocatesResponse.data;

        this.advocatesList = advocates.map(advocate => ({
          label: advocate.name.toString(),
          value: advocate.id.toString()
        }))

        return this.route.params;
      }),
      switchMap((params: Params) => {
        if (params['id']) {
          this.mainService.setPreloaderState(true);

          this.fields = [
            {slug: 'name', name: 'Назва', required: true, class: 'w-100', type: 'text'},
            {slug: 'responsible_person_id', name: 'Відповідальний адвокат', required: false, class: 'w-100', type: 'select', choises: this.advocatesList},
            {slug: 'edrpou', name: 'ЄДРПОУ', required: false, class: 'w-50', type: 'text'},
            {slug: 'contract_date', name: 'Дата укладення угоди', required: false, class: 'w-50', type: 'date'},
            {slug: 'contact_person_name', name: 'Ім\'я контактної особи', required: false, class: 'w-50', type: 'text'},
            {slug: 'contact_person_phone', name: 'Телефон контактної особи', required: false, class: 'w-50', type: 'text'},
            {slug: 'director_person_name', name: 'Ім\'я директор', required: false, class: 'w-50', type: 'text'},
            {slug: 'director_person_phone', name: 'Телефон директора', required: false, class: 'w-50', type: 'text'},
            {slug: 'accountant_person_name', name: 'Ім\'я бухгалтера', required: false, class: 'w-50', type: 'text'},
            {slug: 'accountant_person_phone', name: 'Телефон бухгалтера', required: false, class: 'w-50', type: 'text'},
            {slug: 'legal_address', name: 'Юр. адреса', required: false, class: 'w-100', type: 'text'},
            {slug: 'actual_address', name: 'Фактична адреса', required: false, class: 'w-100', type: 'text'},
            {slug: 'payments_edit', name: 'Виплати', required: true, class: 'w-50', type: 'paymodal'},
            {slug: 'info', name: 'Інформація про абонента', required: false, class: 'w-100', type: 'textarea'},
          ];
          return this.subscribersService.getOne(params['id']);
        }
        let advocateField = this.fields.find(field => field.slug === 'responsible_person_id');
        if (advocateField) {
          advocateField.choises = this.advocatesList
        }
        return new Observable();
      })
    ).subscribe(
      (subscriber: any) => {
        this.data = subscriber.data;
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
