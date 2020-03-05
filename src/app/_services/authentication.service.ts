import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationService{
    private CurrentUserSubject: BehaviorSubject<any>;
    public CurrentUser: Observable<any>;


    constructor (private http: HttpClient)
    {
        this.CurrentUserSubject = new BehaviorSubject <any>(JSON.parse(localStorage.getItem('CurrentUser')));
        this.CurrentUser = this.CurrentUserSubject.asObservable();
    }

    public get CurrentUserValue()
    {
        return this.CurrentUserSubject.value();
    }


    login(username, password)
    {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {username,password})
        .pipe (map(user => {
            localStorage.setItem('CurrentUser', JSON.stringify(user) );
            this.CurrentUserSubject.next(user);
            return user;
        }));
    }

    logout()
    {
        localStorage.removeItem('CurrentUser');
        this.CurrentUserSubject.next(null);
    }
}