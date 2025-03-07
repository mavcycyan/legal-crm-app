import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.checkUser()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
    }
    return next.handle(request).pipe(
      // @ts-ignore
      catchError((requestError: HttpErrorResponse) => {
        console.log(requestError); // "Unauthenticated."
        if (requestError && requestError.status === 401) {
          const message = (requestError.error.message === 'Invalid credentials') ? 'Некорректні логін або пароль' : requestError.error.message;
          alert('Не авторизовано. ' + message);
          sessionStorage.removeItem('currentUser');
          sessionStorage.removeItem('userToken');
          this.router.navigate(['/login']);
          return throwError(() => new Error(requestError.message));
        } else if (requestError && requestError.error.message === 'Unauthenticated.') {
          alert('Проблеми з авторизацією. Пройдіть повторну авторизацію.');
          sessionStorage.removeItem('currentUser');
          sessionStorage.removeItem('userToken');
          this.router.navigate(['/login']);
          return throwError(() => new Error(requestError.message));
        } else {
          console.error('Server error:', requestError);
          const message = (requestError.error.message === 'Access Denied') ? 'Доступ до цих даних заборонено' : requestError.error.message;
          alert('Помилка на сервері. ' + message);
          return throwError(() => new Error(requestError.message));
        }
      })
    );
  }
}
