import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

export interface List {
  type: String,
  responsible: String,
  title: String,
  dateStart: String,
  dateEnd: String
}
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})


export class MainPageComponent implements OnInit{
  login: String = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.login = this.authService.getLogin();
  }
}
