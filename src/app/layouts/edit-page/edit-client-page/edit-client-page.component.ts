import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../../../services/clients/clients.service";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";

@Component({
  selector: 'app-edit-client-page',
  templateUrl: './edit-client-page.component.html',
  styleUrls: ['./edit-client-page.component.scss']
})
export class EditClientPageComponent implements OnInit{
  form: FormGroup = {} as FormGroup;
  fields: FormFieldsInterface[] = [
    {slug: 'full_name', name: 'П.І.Б.', class: 'w-100', type: 'text'},
    {slug: 'phone', name: 'Телефон', class: 'w-50', type: 'text'},
    {slug: 'email', name: 'E-mail', class: 'w-50', type: 'text'},
    {slug: 'address', name: 'Адреса', class: 'w-100', type: 'text'},
    {slug: 'where_knows', name: 'Звідки дізналися', class: 'w-50', type: 'text'},
    {slug: 'birthday', name: 'Дата народження', class: 'w-50', type: 'text'},
  ];

  constructor(public clientService: ClientsService) {
  }

  ngOnInit(): void {
    let newFields: any = {};
    this.fields.forEach((field: any) => {
      newFields[field.slug] = new FormControl('', Validators.required);
    });
    this.form = new FormGroup(newFields);
  }
}
