import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './Home';
import {LoginComponent} from './Login';
import {RegisterComponent} from './Register';
import {HelpComponent} from './Help';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'help', component:HelpComponent},

    //otherwise redirect to home
    {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);