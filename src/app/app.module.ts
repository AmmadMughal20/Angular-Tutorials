import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {appRoutingModule} from './app.routing';
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
                        FakeBackendProvider
                ],
    bootstrap: [AppComponent]
})

export class AppModule{}