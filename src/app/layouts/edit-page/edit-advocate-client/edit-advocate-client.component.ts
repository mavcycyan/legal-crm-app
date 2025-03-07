import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {ClientsCardInterface, ClientsCardInterfaceRequest} from "../../../models/clients/clients-card.interface";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {MainService} from "../../../services/main/main.service";
import {AdvocateClientsService} from "../../../services/advocate/advocate-clients.service";

@Component({
  selector: 'app-edit-advocate-client',
  templateUrl: './edit-advocate-client.component.html',
  styleUrls: ['./edit-advocate-client.component.scss']
})
export class EditAdvocateClientComponent {
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: ClientsCardInterface = {} as ClientsCardInterface;
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'full_name', name: 'П.І.Б.', required: true, class: 'w-100', type: 'text'},
    {slug: 'address', name: 'Адреса', required: false, class: 'w-100', type: 'text'},
    {slug: 'phone', name: 'Телефон', required: false, class: 'w-50', type: 'text'},
    {slug: 'where_knows', name: 'Звідки дізналися', required: false, class: 'w-50', type: 'text'},
    {slug: 'birthday', name: 'Дата народження', required: false, class: 'w-50', type: 'date'},
    {slug: 'worker', name: 'Хто займався', required: false, class: 'w-50', type: 'text'},
  ];

  constructor(private route: ActivatedRoute,
              public advocateClientService: AdvocateClientsService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.mainService.setPreloaderState(true);
            this.advocateClientService.getOne(params['id']).subscribe((client: ClientsCardInterfaceRequest) => {
              this.data = client.data;
              this.isEdit = true;
              this.mainService.setPreloaderState(false);

            });
          }
        }
      )
  }
}
