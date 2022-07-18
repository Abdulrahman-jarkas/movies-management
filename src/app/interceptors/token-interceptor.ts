import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { baseUrlWithoutV } from "src/config/api";
import { AuthService } from "../shared/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const isLoggedIn = token;
    const isApiUrl = req.url.startsWith(baseUrlWithoutV);

    if (isLoggedIn && isApiUrl)
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

    return next.handle(req).pipe(
      catchError((even: HttpErrorResponse) => {
        if (even.error?.statusCode === 401) {
          this.authService.logout()
          this.router.navigate(["/auth"]);
        }
        return throwError(even.error);
      })
    );
  }
}
