import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../../../services/clients/clients.service";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";

@Component({
  selector: 'app-edit-client-page',
  templateUrl: './edit-client-page.component.html',
  styleUrls: ['./edit-client-page.component.scss']
})
export class EditClientPageComponent{
  form: FormGroup = {} as FormGroup;
  fields: FormFieldsInterface[] = [
    {slug: 'full_name', name: 'П.І.Б.', required: true, class: 'w-100', type: 'text'},
    {slug: 'phone', name: 'Телефон', required: false, class: 'w-50', type: 'text'},
    {slug: 'email', name: 'E-mail', required: false, class: 'w-50', type: 'text'},
    {slug: 'address', name: 'Адреса', required: false, class: 'w-100', type: 'text'},
    {slug: 'where_knows', name: 'Звідки дізналися', required: false, class: 'w-50', type: 'text'},
    {slug: 'birthday', name: 'Дата народження', required: false, class: 'w-50', type: 'text'},
  ];

  constructor(public clientService: ClientsService) {
  }
}
