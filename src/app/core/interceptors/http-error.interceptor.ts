import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomErrorHandler } from '../errors/custom-error.handler';
import { MessageSeverity } from '../models/dialogs/alert-message';
import { CustomError } from '../models/errors/custom-error.model';
import { AlertService } from '../services/shared/alert.service';
import { environment } from '@env/environment';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  handleError = (error: HttpErrorResponse) => {
    return CustomErrorHandler.handleError(error);
  }

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

      const request = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return this.handleHttpMethod(next, request);
  }

  private showErrorMessage(customError: CustomError) {
      this.alertService.showMessage(`${customError.status}`, `${customError}`, MessageSeverity.error);
  }

  private handleHttpMethod(next: HttpHandler, request: HttpRequest < any > ): Observable < HttpEvent < any >> {
    return next.handle(request).pipe(tap(event => {}, (error: HttpErrorResponse) => {
      CustomErrorHandler.handleError(error).subscribe(res => {}, (customError: CustomError) => {
        this.checkStatusForDisplayMessages(error, customError);
      });
    }));
  }

  private checkStatusForDisplayMessages(error: HttpErrorResponse, customError: CustomError) {
    if (error.status === 400 || error.status === 404) {
      this.showErrorMessage(customError);
    } else {
      if (!environment.production) {
        this.showErrorMessage(customError);
      }
    }
  }
}
