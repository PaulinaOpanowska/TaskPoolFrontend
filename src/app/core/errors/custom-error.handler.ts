import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { CustomError } from "../models/errors/custom-error.model";
import { UtilitiesService } from "../services/utilities.service";
export class CustomErrorHandler {

  constructor() {}

  public static promiseError(error: any): Promise < any > {
    return Promise.reject(error.error || error);
  }

  public static handleError(error: HttpErrorResponse): Observable < CustomError > {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,

      let errorName = this.checkStatuses(error);
      let errorMessage = error.message;
      if (error.error !== null && error.error !== undefined) {
        errorName = error.error.name;
        errorMessage = error.error.message;
      }

      if (errorName !== undefined) {
        return throwError({
          name: errorName,
          message: errorMessage,
          status: error.status
        });
      }
    }
    return throwError({
      name: error.name,
      message: error.message,
      status: error.status
    });
  }

  static checkStatuses(error: HttpErrorResponse): any {
    if (UtilitiesService.checkNotAuthorized(error)) {
      return 'Unauthorized';
    } else if (UtilitiesService.checkAccessDenied(error)) {
      return 'Access denied';
    }
    return undefined;
  }
}