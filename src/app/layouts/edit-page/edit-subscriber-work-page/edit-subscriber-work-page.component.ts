import {Component, OnInit} from '@angular/core';
import {Observable, Subscription, switchMap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {
  SubscribersWorksCardInterface
} from "../../../models/subscribers/subscribers-works-card.interface";
import {SubscribersService} from "../../../services/subscribers/subscribers.service";
import {SubscriberWorksService} from "../../../services/subscribers/subscriber-works.service";
import {MainService} from "../../../services/main/main.service";
import {SubscriberWorkPaymentsService} from "../../../services/subscribers/subscriber-work-payments.service";
import {SubscriberWorkFilesService} from "../../../services/subscribers/subscriber-work-files.service";

@Component({
  selector: 'app-edit-subscriber-work-page',
  templateUrl: './edit-subscriber-work-page.component.html',
  styleUrls: ['./edit-subscriber-work-page.component.scss']
})
export class EditSubscriberWorkPageComponent implements OnInit{
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: SubscribersWorksCardInterface = {} as SubscribersWorksCardInterface;
  subscribersList: {label: string, value: string}[] = [];
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'subscriber_id', name: 'Абонент', required: true, class: 'w-100', type: 'select', choises: []},
    {slug: 'date', name: 'Дата початку роботи', required: true, class: 'w-50', type: 'date'},
    {slug: 'date_end', name: 'Дата завершення роботи', required: false, class: 'w-50', type: 'date'},
    {slug: 'name', name: 'Назва роботи', required: true, class: 'w-50', type: 'text'},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
    {slug: 'worker', name: 'Хто займався', required: false, class: 'w-50', type: 'text'},
    {slug: 'fee', name: 'Гонорар', required: false, class: 'w-50', type: 'number'},
    {slug: 'payment', name: 'Перший внесок', required: false, class: 'w-50', type: 'number'},
    {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
  ];

  constructor(private route: ActivatedRoute,
              public subscriberWorksService: SubscriberWorksService,
              public subscribersService: SubscribersService,
              public subscriberWorkPaymentsService: SubscriberWorkPaymentsService,
              public subscriberWorkFilesService: SubscriberWorkFilesService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.subscribersService.getList().pipe(
      switchMap((subscribersResponse) => {
        const subscribers = subscribersResponse.data;

        this.subscribersList = subscribers.map(subscriber => ({
          label: subscriber.name.toString(),
          value: subscriber.id.toString()
        }));
        return this.route.params;
      }),
      switchMap((params: Params) => {
        if (params['id'] !== undefined) {

          this.fields = [
            {slug: 'subscriber_id', name: 'Абонент', required: true, class: 'w-100', type: 'select', choises: this.subscribersList},
            {slug: 'date', name: 'Дата початку роботи', required: true, class: 'w-50', type: 'date'},
            {slug: 'date_end', name: 'Дата завершення роботи', required: false, class: 'w-50', type: 'date'},
            {slug: 'name', name: 'Назва роботи', required: true, class: 'w-50', type: 'text'},
            {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
            {slug: 'worker', name: 'Хто займався', required: false, class: 'w-50', type: 'text'},
            {slug: 'payments_edit', name: 'Виплати', required: false, class: 'w-50', type: 'paymodal'},
            { slug: 'files_upload', name: 'Прикріплені файли', required: true, class: 'w-50', type: 'filemodal' },
            {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
          ];
          return this.subscriberWorksService.getOne(params['id']);
        }

        const subscriberField = this.fields.find(field => field.slug === 'subscriber_id')
        if (subscriberField) {
          subscriberField.choises = this.subscribersList;
        }
        this.mainService.setPreloaderState(false);
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
    );
  }
}
