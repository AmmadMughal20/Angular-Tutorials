import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../_services";
import { Observable } from "rxjs";



@Injectable()
export class JWTInterceptor implements HttpInterceptor{

    constructor(private authenticationService: AuthenticationService)
    {}


    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token)
        {
            request = request.clone({
                setHeaders:{
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}