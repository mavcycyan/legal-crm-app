import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  preloader: boolean = false;

  checkPreloader(event: boolean = false): void {
    this.preloader = event;
  }
}
