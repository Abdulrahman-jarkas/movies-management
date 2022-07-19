import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.token;
    const isLoggedIn = token;
    const isApiUrl = req.url.startsWith(environment.domain);

    if (isLoggedIn && isApiUrl)
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

    return next.handle(req).pipe(
      catchError((even: HttpErrorResponse) => {
        if (even.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
        throw even;
      })
    );
  }
}
