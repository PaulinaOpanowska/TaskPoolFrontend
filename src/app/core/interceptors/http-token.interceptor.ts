// tslint:disable-next-line:max-line-length
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ConfigStore } from '../stores/configs/config.store';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject < string > = new BehaviorSubject < string > (null);

  requestedUrlSubscription: Subscription;
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute, private configStore: ConfigStore
  ) {}

  addToken(req: HttpRequest < any >): HttpRequest < any > {
      return req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
  }

  // tslint:disable-next-line:max-line-length
  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any > | HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse < any > | HttpUserEvent < any >> {
    return next.handle(this.addToken(req));
  }
}
