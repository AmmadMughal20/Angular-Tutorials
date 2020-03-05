import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {appRoutingModule} from './app.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {JWTInterceptor, ErrorInterceptor} from './_Helpers';
import {AppComponent} from './app.component';
import {LoginComponent} from './Login';
import {HomeComponent} from './Home';
import {RegisterComponent} from './Register';
import {HelpComponent} from './Help';
import { FakeBackendProvider } from './_Helpers';

@NgModule({
    imports: 
            [
                BrowserModule,
                ReactiveFormsModule,
                HttpClientModule,
                appRoutingModule
            ],
    declarations:
                [   
                    AppComponent,
                    HomeComponent,
                    RegisterComponent,
                    LoginComponent,
                    HelpComponent
                ],
    providers:
                [
                    {provide: HTTP_INTERCEPTORS, useClass:JWTInterceptor, multi:true},
                    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
                        FakeBackendProvider
                ],
    bootstrap: [AppComponent]
})

export class AppModule{}