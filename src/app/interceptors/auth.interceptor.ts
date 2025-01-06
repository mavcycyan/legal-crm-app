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
        if (requestError && requestError.status === 401) {
          alert(requestError.message);
        }
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userToken');
        this.router.navigate(['/login']);
        return throwError(() => new Error(requestError.message));
      })
    );
  }
}
