import { Component } from '@angular/core';
import {Observable, Subscription, switchMap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {
  AdvocateCategoriesInterface, AdvocateCategoriesInterfaceRequest,
  AdvocateCategoryInterfaceRequest
} from "../../../models/advocates/advocate-categories.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {AdvocateCategoryService} from "../../../services/advocate/advocate-category.service";
import {MainService} from "../../../services/main/main.service";

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
    {slug: 'parent_id', name: 'Батьківська категорія', required: false, class: 'w-100', type: 'select', choises: []},
  ];
  advocateCatsList: {label: string, value: string}[] = [];

  constructor(private route: ActivatedRoute,
              public advocateService: AdvocateService,
              public advocateCategoryService: AdvocateCategoryService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.advocateService.getCategories().pipe(
      switchMap((data: AdvocateCategoriesInterfaceRequest) => {
        const categories = data.data;

        this.advocateCatsList = categories.map(category => ({
          label: category.name.toString(),
          value: category.id.toString()
        }));

        return this.route.params;
      }),
      switchMap((params: Params) => {
        if (params['id'] !== undefined) {
          this.fields = [
            {slug: 'name', name: 'Назва', required: true, class: 'w-50', type: 'text'},
            {slug: 'slug', name: 'Символьна назва', required: true, class: 'w-50', type: 'text'},
            {slug: 'parent_id', name: 'Батьківська категорія', required: false, class: 'w-100', type: 'select', choises: this.advocateCatsList},
          ];
          return this.advocateService.getCategory(params['id']);
        }
        const catField = this.fields.find(field => field.slug === 'parent_id');
        if (catField) {
          catField.choises = this.advocateCatsList;
        }
        this.mainService.setPreloaderState(false);
        return new Observable<never>();
      })
    ).subscribe((advocate) => {
      this.data = advocate.data;
      this.isEdit = true;
      this.mainService.setPreloaderState(false);
    });
  }
}
