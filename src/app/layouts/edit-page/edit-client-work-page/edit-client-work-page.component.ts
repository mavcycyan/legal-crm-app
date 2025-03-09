import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ClientsService} from "../../../services/clients/clients.service";
import {ClientWorksService} from "../../../services/clients/client-works.service";
import {ActivatedRoute, Params} from "@angular/router";
import {
  ClientWorksCardInterface
} from "../../../models/clients/client-works-card.interface";
import {Observable, Subscription, switchMap} from "rxjs";
import {MainService} from "../../../services/main/main.service";
import {ClientWorkPaymentsService} from "../../../services/clients/client-work-payments.service";
import {ClientWorkFilesService} from "../../../services/clients/client-work-files.service";

@Component({
  selector: 'app-edit-client-work-page',
  templateUrl: './edit-client-work-page.component.html',
  styleUrls: ['./edit-client-work-page.component.scss']
})
export class EditClientWorkPageComponent implements OnInit{
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: ClientWorksCardInterface = {} as ClientWorksCardInterface;
  clientsList: {label: string, value: string}[] = [];
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'client_id', name: 'Клієнт', required: true, class: 'w-100', type: 'select', choises: []},
    {slug: 'visit_date', name: 'Дата звернення', required: true, class: 'w-50', type: 'date'},
    {slug: 'visit_date_end', name: 'Дата завершення', required: false, class: 'w-50', type: 'date'},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
    {slug: 'worker', name: 'Хто займався', required: false, class: 'w-50', type: 'text'},
    {slug: 'visit_purpose', name: 'Мета звернення', required: true, class: 'w-100', type: 'text'},
    {slug: 'fee', name: 'Гонорар', required: false, class: 'w-50', type: 'number'},
    {slug: 'payment', name: 'Перший внесок', required: false, class: 'w-50', type: 'number'},
    {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
  ];

  constructor(private route: ActivatedRoute,
              public clientWorksService: ClientWorksService,
              public clientService: ClientsService,
              public clientWorkPaymentsService: ClientWorkPaymentsService,
              public clientWorkFilesService: ClientWorkFilesService,
              public mainService: MainService) {
  }


  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.clientService.getClientsList().pipe(
      switchMap((clientsResponse) => {
        const clients = clientsResponse.data;

        this.clientsList = clients.map(client => ({
            label: client.full_name.toString(),
            value: client.id.toString()
        }));
        return this.route.params;
      }),
      switchMap((params: Params) => {
        if (params['id'] !== undefined) {
          this.fields = [
            { slug: 'client_id', name: 'Клієнт', required: true, class: 'w-100', type: 'select', choises: this.clientsList },
            { slug: 'visit_date', name: 'Дата звернення', required: true, class: 'w-50', type: 'date' },
            { slug: 'visit_date_end', name: 'Дата завершення', required: false, class: 'w-50', type: 'date' },
            { slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status' },
            { slug: 'worker', name: 'Хто займався', required: false, class: 'w-50', type: 'text' },
            { slug: 'payments_edit', name: 'Виплати', required: true, class: 'w-50', type: 'paymodal' },
            { slug: 'files_upload', name: 'Прикріплені файли', required: true, class: 'w-50', type: 'filemodal' },
            { slug: 'visit_purpose', name: 'Мета звернення', required: true, class: 'w-100', type: 'text' },
            { slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done' }
          ];
          return this.clientWorksService.getOne(params['id']);
        }
        const clientField = this.fields.find(field => field.slug === 'client_id');
        if (clientField) {
          clientField.choises = this.clientsList;
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
