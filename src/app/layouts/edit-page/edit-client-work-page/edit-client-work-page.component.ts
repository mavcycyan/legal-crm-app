import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ClientsService} from "../../../services/clients/clients.service";
import {ClientsListInterface, ClientsListInterfaceRequest} from "../../../models/clients/clients-list.interface";

@Component({
  selector: 'app-edit-client-work-page',
  templateUrl: './edit-client-work-page.component.html',
  styleUrls: ['./edit-client-work-page.component.scss']
})
export class EditClientWorkPageComponent  implements OnInit{
  form: FormGroup = {} as FormGroup;
  fields: FormFieldsInterface[] = [
    {slug: 'visit_date', name: 'Дата відвідування', class: 'w-100', type: 'text'},
    {slug: 'visit_purpose', name: 'Мета звернення', class: 'w-50', type: 'text'},
    {slug: 'what_done', name: 'Що зроблено', class: 'w-50', type: 'text'},
    {slug: 'result', name: 'Результат', class: 'w-100', type: 'text'},
    {slug: 'fee', name: 'Гонорар', class: 'w-50', type: 'text'},
    {slug: 'client_id', name: 'Клієнт', class: 'w-50', type: 'select', choises: []},
  ];

  constructor(public clientService: ClientsService) {
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
    // let newFields: any = {};
    // this.fields.forEach((field: any) => {
    //   newFields[field.slug] = new FormControl('', Validators.required);
    // });
    // this.form = new FormGroup(newFields);
  }
}
