import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {ClientsCardInterface, ClientsCardInterfaceRequest} from "../../../models/clients/clients-card.interface";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {
  AdvocateCategoriesInterface,
  AdvocateCategoriesInterfaceRequest, AdvocateCategoryInterfaceRequest
} from "../../../models/advocates/advocate-categories.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {ClientsService} from "../../../services/clients/clients.service";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {AdvocateCategoryService} from "../../../services/advocate/advocate-category.service";

@Component({
  selector: 'app-edit-advocate-category',
  templateUrl: './edit-advocate-category.component.html',
  styleUrls: ['./edit-advocate-category.component.scss']
})
export class EditAdvocateCategoryComponent {
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: AdvocateCategoriesInterface = {} as AdvocateCategoriesInterface;
  isEdit: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'name', name: 'Назва', required: true, class: 'w-50', type: 'text'},
    {slug: 'slug', name: 'Символьна назва', required: true, class: 'w-50', type: 'text'},
  ];

  constructor(private route: ActivatedRoute,
              public advocateService: AdvocateService,
              public advocateCategoryService: AdvocateCategoryService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.advocateService.getCategory(params['id']).subscribe((advocate: AdvocateCategoryInterfaceRequest) => {
              this.data = advocate.data;
              this.isEdit = true;
            });
          }
        }
      )
  }
}
