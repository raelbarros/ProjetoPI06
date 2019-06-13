
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private router: Router, private auth: AuthService) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem("token");

        if (token) {
            request = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + token)
            });
        }

        if (!request.headers.has("Content-Type")) {
            request = request.clone({
                headers: request.headers.set("Content-Type", "application/json")
            });
        }

        request = request.clone({
            headers: request.headers.set("Accept", "application/json")
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    //this.globals.loading = false;
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log("error interceptor--->>>", error, request.body);

                if (error.status == 401) {
                    this.auth.logout()
                    this.router.navigate([""]);
                }

                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : "",
                    status: error.status
                };

                return throwError(error);
            })
        );
    }
}