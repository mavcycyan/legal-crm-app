import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {
  SubscribersWorksCardInterface,
  SubscribersWorksCardInterfaceRequest
} from "../../../models/subscribers/subscribers-works-card.interface";
import {
  SubscribersListInterface,
  SubscribersListInterfaceRequest
} from "../../../models/subscribers/subscribers-list.interface";
import {SubscribersService} from "../../../services/subscribers/subscribers.service";
import {SubscriberWorksService} from "../../../services/subscribers/subscriber-works.service";
import {MainService} from "../../../services/main/main.service";
import {SubscriberPaymentsService} from "../../../services/subscribers/subscriber-payments.service";
import {SubscriberWorkPaymentsService} from "../../../services/subscribers/subscriber-work-payments.service";

@Component({
  selector: 'app-edit-subscriber-work-page',
  templateUrl: './edit-subscriber-work-page.component.html',
  styleUrls: ['./edit-subscriber-work-page.component.scss']
})
export class EditSubscriberWorkPageComponent implements OnInit{
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: SubscribersWorksCardInterface = {} as SubscribersWorksCardInterface;
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'subscriber_id', name: 'Абонент', required: true, class: 'w-100', type: 'select', choises: []},
    {slug: 'date', name: 'Дата початку роботи', required: true, class: 'w-50', type: 'date'},
    {slug: 'name', name: 'Назва роботи', required: true, class: 'w-50', type: 'text'},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
    {slug: 'fee', name: 'Гонорар', required: false, class: 'w-50', type: 'text'},
    {slug: 'payment', name: 'Перший внесок', required: false, class: 'w-50', type: 'text'},
    {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
  ];

  constructor(private route: ActivatedRoute,
              public subscriberWorksService: SubscriberWorksService,
              public subscribersService: SubscribersService,
              public subscriberWorkPaymentsService: SubscriberWorkPaymentsService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.mainService.setPreloaderState(true);
            this.subscriberWorksService.getOne(params['id']).subscribe((work: SubscribersWorksCardInterfaceRequest) => {
              this.data = work.data;
              this.isEdit = true;
              this.fields = [
                {slug: 'subscriber_id', name: 'Абонент', required: true, class: 'w-100', type: 'select', choises: []},
                {slug: 'date', name: 'Дата початку роботи', required: true, class: 'w-50', type: 'date'},
                {slug: 'name', name: 'Назва роботи', required: true, class: 'w-50', type: 'text'},
                {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
                {slug: 'payments_edit', name: 'Виплати', required: true, class: 'w-50', type: 'paymodal'},
                {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
              ];
              this.mainService.setPreloaderState(false);
            });
          }
        }
      )
    this.subscribersService.getList().subscribe((data: SubscribersListInterfaceRequest) => {
      const subscribers = data.data;
      this.fields.map((field: FormFieldsInterface) => {
        if (field.slug === 'subscriber_id') {
          subscribers.forEach((subscriber: SubscribersListInterface, index: number) => {
            if (field.choises !== undefined) {
              field.choises[index] = {label: subscriber.name.toString(), value: subscriber.id.toString()};
            }
          });
        }
      });
    });
  }
}
