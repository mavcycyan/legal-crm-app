import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ResponseHttpLogin} from "../../../models/auth/response.http.login.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{
  isSubmitted: boolean = false;
  form: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  aSub: Subscription = new Subscription();

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.status !== 'INVALID') {
      this.aSub = this.authService.login(this.form.value.login, this.form.value.password)
        .subscribe((data: ResponseHttpLogin | null) => {
            if (data === null) {
              alert('Failed to get data');
            }
            else {
              this.router.navigate(['']);
            }
          },
          (error: any) => {
            alert(error);
          })
    }
  }

  ngOnDestroy() {
    this.aSub.unsubscribe();
  }

}
