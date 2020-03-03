import { Injectable } from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import { defaultUrlMatcher } from '@angular/router/src/shared';
import { ok } from 'assert';

let users = [{id:1, firstName: 'Ammad', lastName: 'Mughal', userName: 'test', password: 'test'}];



export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const {url, method, headers, body} = request;


        return of (null)
        .pipe(mergeMap(handleRoute)).pipe(materialize()).pipe(delay(500)).pipe(dematerialize());


        function handleRoute()
        {
            switch(true)
            {
                 case url.endsWith('/users/authenticate') && method === 'POST':
                     return authenticate();

                     default: return next.handle(request);
            }
        }

        function authenticate()
        {
            const {userName, password} = body;

            const user = users.find(x => x.userName === userName && x.password === password);
            if(!user)
            {
                return error('User Not Found!');
            }

            return ok({
                id: user.id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }


        function ok(body?)
        {
            return of (new HttpResponse({ status:200, body}))
        }

        function error(message)
        {
            return throwError ({
                error: {message}
            });
        }
       
    }
    }

    export const FakeBackendProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: FakeBackendInterceptor,
        multi: true 
    };