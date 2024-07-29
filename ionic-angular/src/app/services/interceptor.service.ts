import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Injectable, inject} from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    utilsSvc = inject(UtilsService)

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.has('skip-auth')) {
            request = request.clone({
                //Remove the "skip-auth" header so it does not get sent to the server
                headers: request.headers.delete('skip-auth'),
            });
            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
        } else {
            let localStorage = JSON.parse(this.utilsSvc.getInLocalStorage('user'));
            const newRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage?.token}`,
                },
            });
            return next.handle(newRequest);
        }
    }
}
