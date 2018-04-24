import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from "rxjs/operators";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {

          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('interceptor has caught error 401');
            }
            if (err.status === 403) {
              console.log('interceptor has caught error 403');
            }
          }
        }
      )
    )
  }
}
