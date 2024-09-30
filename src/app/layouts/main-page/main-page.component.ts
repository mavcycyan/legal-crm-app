import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})


export class MainPageComponent implements OnInit{
  name: String = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.name = this.authService.getName();
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
