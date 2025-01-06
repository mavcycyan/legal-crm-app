import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})


export class MainPageComponent implements OnInit{
  name: String = '';
  userType: string|null = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.name = this.authService.getName();
    this.userType = sessionStorage.getItem('userType')
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
