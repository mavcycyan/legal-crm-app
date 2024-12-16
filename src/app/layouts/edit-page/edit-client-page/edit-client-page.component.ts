import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ClientsService} from "../../../services/clients/clients.service";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {ClientsCardInterface, ClientsCardInterfaceRequest} from "../../../models/clients/clients-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-client-page',
  templateUrl: './edit-client-page.component.html',
  styleUrls: ['./edit-client-page.component.scss']
})
export class EditClientPageComponent implements OnInit{
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: ClientsCardInterface = {} as ClientsCardInterface;
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'full_name', name: 'П.І.Б.', required: true, class: 'w-100', type: 'text'},
    {slug: 'phone', name: 'Телефон', required: false, class: 'w-50', type: 'text'},
    {slug: 'address', name: 'Адреса', required: false, class: 'w-100', type: 'text'},
    {slug: 'where_knows', name: 'Звідки дізналися', required: false, class: 'w-50', type: 'text'},
    {slug: 'birthday', name: 'Дата народження', required: false, class: 'w-50', type: 'text'},
  ];

  constructor(private route: ActivatedRoute,
              public clientService: ClientsService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.clientService.getOne(params['id']).subscribe((client: ClientsCardInterfaceRequest) => {
              this.data = client.data;
              this.isEdit = true;

            });
          }
        }
      )
  }

}
