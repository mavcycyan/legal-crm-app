import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {ResponseHttpPasswordReset} from "../../../models/auth/response.http.login.interface";

@Component({
  selector: 'app-edit-form-password-reset',
  templateUrl: './edit-form-password-reset.component.html',
  styleUrls: ['./edit-form-password-reset.component.scss']
})
export class EditFormPasswordResetComponent implements OnInit{

  @Input() id: number|null = null;
  @Input() type?: string = 'default';
  @Output() modalState: EventEmitter<boolean> = new EventEmitter<boolean>();

  form: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    check_password: new FormControl('', Validators.required),
  });
  pendingModal: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.pendingModal = true;
    if (this.form.status === 'VALID') {
      if (this.id !== null) {
        const data = this.form.value;
        this.authService.passwordReset(this.id, data).subscribe((data: ResponseHttpPasswordReset) => {
          if (data.success) {
            alert(data.message);
          } else {
            alert('При скиданні паролю виникла помилка');
          }
          this.pendingModal = false;
        })
      } else {
        alert('Помилка: Невизначений користувач!');
      }
    }
  }
}
