import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ErrorService } from "../shared/services/error.service";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(2),
      catchError((even: HttpErrorResponse) => {
        this.errorService.setError(even.error.error);
        return throwError(even.error);
      })
    );
  }
}
