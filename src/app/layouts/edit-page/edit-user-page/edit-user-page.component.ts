import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormFieldsInterface} from "../../../models/forms/form.fields.interface";
import {UserInterface, UserInterfaceRequest} from "../../../models/auth/user.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {MainService} from "../../../services/main/main.service";
import {UserService} from "../../../services/auth/user.service";

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent {
  subClient$: Subscription = {} as Subscription;
  form: FormGroup = {} as FormGroup;
  data: UserInterface = {} as UserInterface;
  isEdit: boolean = false;
  isInactive: boolean = false;
  fields: FormFieldsInterface[] = [
    {slug: 'name', name: 'Ім\'я', required: true, class: 'w-50', type: 'text'},
    {slug: 'email', name: 'Email', required: true, class: 'w-50', type: 'text'},
    {slug: 'password', name: 'Пароль', required: false, class: 'w-50', type: 'text'},
    {slug: 'birthday', name: 'Дата народження', required: false, class: 'w-50', type: 'date'},
    {slug: 'address', name: 'Адреса', required: false, class: 'w-100', type: 'text'},
    {slug: 'phone', name: 'Телефон', required: false, class: 'w-50', type: 'text'},
    {slug: 'role_id', name: 'Посада', required: false, class: 'w-50', type: 'select', choises: [
        {label: 'Директор', value: '2'},
        {label: 'Юрист', value: '3'},
        {label: 'Адвокат', value: '4'},
      ]},
    {slug: 'certificate_num', name: 'Номер свідоцтва', required: false, class: 'w-100', type: 'text'},
    {slug: 'certificate_place', name: 'Де і ким видано свідоцтво', required: false, class: 'w-100', type: 'textarea'},
  ];

  constructor(private route: ActivatedRoute,
              public userService: UserService,
              public mainService: MainService) {
  }

  ngOnInit(): void {
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== undefined) {
            this.mainService.setPreloaderState(true);
            this.userService.getOne(params['id']).subscribe((user: UserInterfaceRequest) => {
              this.data = user.data;
              this.isEdit = true;
              if (user.data.inactive === 1) {
                this.isInactive = true;
              }
              this.fields = [
                {slug: 'name', name: 'Ім\'я', required: true, class: 'w-50', type: 'text'},
                {slug: 'email', name: 'Email', required: true, class: 'w-50', type: 'text'},
                {slug: 'birthday', name: 'Дата народження', required: true, class: 'w-50', type: 'date'},
                {slug: 'password_reset', name: 'Скинути пароль', required: false, class: 'w-50', type: 'password_reset'},
                {slug: 'address', name: 'Адреса', required: true, class: 'w-100', type: 'text'},
                {slug: 'phone', name: 'Телефон', required: true, class: 'w-50', type: 'text'},
                {slug: 'role_id', name: 'Посада', required: false, class: 'w-50', type: 'select', choises: [
                    {label: 'Директор', value: '2'},
                    {label: 'Юрист', value: '3'},
                    {label: 'Адвокат', value: '4'},
                  ]},
                {slug: 'certificate_num', name: 'Номер свідоцтва', required: false, class: 'w-100', type: 'text'},
                {slug: 'certificate_place', name: 'Де і ким видано свідоцтво', required: false, class: 'w-100', type: 'textarea'},
              ];
              this.mainService.setPreloaderState(false);
            });
          }
        }
      )
  }
}
