import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ClientsService} from "../../../services/clients/clients.service";
import {ClientsListInterface, ClientsListInterfaceRequest} from "../../../models/clients/clients-list.interface";
import {ClientWorksService} from "../../../services/clients/client-works.service";
import {ActivatedRoute, Params} from "@angular/router";
import {
  ClientWorksCardInterface,
  ClientWorksCardInterfaceRequest
} from "../../../models/clients/client-works-card.interface";
import {Subscription} from "rxjs";
import {MainService} from "../../../services/main/main.service";
import {ClientWorkPaymentsService} from "../../../services/clients/client-work-payments.service";

@Component({
  selector: 'app-edit-client-work-page',
  templateUrl: './edit-client-work-page.component.html',
  styleUrls: ['./edit-client-work-page.component.scss']
})
export class EditClientWorkPageComponent implements OnInit{
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: ClientWorksCardInterface = {} as ClientWorksCardInterface;
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
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.mainService.setPreloaderState(true);
            this.clientWorksService.getOne(params['id']).subscribe((work: ClientWorksCardInterfaceRequest) => {
              this.data = work.data;
              this.isEdit = true;
              this.fields = [
                {slug: 'client_id', name: 'Клієнт', required: true, class: 'w-100', type: 'select', choises: []},
                {slug: 'visit_date', name: 'Дата звернення', required: true, class: 'w-50', type: 'date'},
                {slug: 'visit_date_end', name: 'Дата завершення', required: false, class: 'w-50', type: 'date'},
                {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'select_status'},
                {slug: 'payments_edit', name: 'Виплати', required: true, class: 'w-50', type: 'paymodal'},
                {slug: 'worker', name: 'Хто займався', required: false, class: 'w-50', type: 'text'},
                {slug: 'visit_purpose', name: 'Мета звернення', required: true, class: 'w-100', type: 'text'},
                {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
              ];
              this.mainService.setPreloaderState(false);
            });
          }
        }
      )
    this.clientService.getClientsList().subscribe((data: ClientsListInterfaceRequest) => {
      const clients = data.data;
      this.fields.map((field: FormFieldsInterface) => {
        if (field.slug === 'client_id') {
          clients.forEach((client: ClientsListInterface, index: number) => {
            if (field.choises !== undefined) {
              field.choises[index] = {label: client.full_name.toString(), value: client.id.toString()};
            }
          });
        }
      });
    });
  }
}
