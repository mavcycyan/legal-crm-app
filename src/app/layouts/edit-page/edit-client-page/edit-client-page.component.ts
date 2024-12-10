import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../../../services/clients/clients.service";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ClientsCardInterface, ClientsCardInterfaceRequest} from "../../../models/clients/clients-card.interface";

@Component({
  selector: 'app-edit-client-page',
  templateUrl: './edit-client-page.component.html',
  styleUrls: ['./edit-client-page.component.scss']
})
export class EditClientPageComponent implements OnInit{
  form: FormGroup = {} as FormGroup;
  data: ClientsCardInterface = {} as ClientsCardInterface;
  fields: FormFieldsInterface[] = [
    {slug: 'full_name', name: 'П.І.Б.', required: true, class: 'w-100', type: 'text'},
    {slug: 'phone', name: 'Телефон', required: false, class: 'w-50', type: 'text'},
    {slug: 'address', name: 'Адреса', required: false, class: 'w-100', type: 'text'},
    {slug: 'where_knows', name: 'Звідки дізналися', required: false, class: 'w-50', type: 'text'},
    {slug: 'birthday', name: 'Дата народження', required: false, class: 'w-50', type: 'text'},
  ];

  constructor(public clientService: ClientsService) {
  }

  ngOnInit(): void {
    this.clientService.getOne(2).subscribe((client: ClientsCardInterfaceRequest) => {
      this.data = client.data
    });
  }

}
