import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ClientsService} from "../../../services/clients/clients.service";
import {ClientsListInterface, ClientsListInterfaceRequest} from "../../../models/clients/clients-list.interface";
import {ClientWorksService} from "../../../services/clients/client-works.service";

@Component({
  selector: 'app-edit-client-work-page',
  templateUrl: './edit-client-work-page.component.html',
  styleUrls: ['./edit-client-work-page.component.scss']
})
export class EditClientWorkPageComponent  implements OnInit{
  form: FormGroup = {} as FormGroup;
  fields: FormFieldsInterface[] = [
    {slug: 'client_id', name: 'Клієнт', required: true, class: 'w-100', type: 'select', choises: []},
    {slug: 'visit_date', name: 'Дата відвідування', required: true, class: 'w-50', type: 'text'},
    {slug: 'visit_purpose', name: 'Мета звернення', required: true, class: 'w-50', type: 'text'},
    {slug: 'result', name: 'Результат', required: false, class: 'w-50', type: 'text'},
    {slug: 'fee', name: 'Гонорар', required: false, class: 'w-50', type: 'text'},
    {slug: 'what_done', name: 'Що зроблено', required: false, class: 'w-100', type: 'what_done'},
  ];

  constructor(public clientWorksService: ClientWorksService,
              public clientService: ClientsService) {
  }

  ngOnInit(): void {
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
