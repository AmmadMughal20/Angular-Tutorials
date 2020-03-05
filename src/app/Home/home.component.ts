import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
    templateUrl:'home.component.html'
})
export class HomeComponent implements OnInit{
    currentUser: any;
    users =[];

    constructor(private authorizationService: AuthenticationService, private userService : UserService)
    {
        this.currentUser = authorizationService.currentUserValue;
    }

    ngOnInit()
    {
        this.loadAllUsers();
    }

    deleteUsers(id: number)
    {
        this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
    }
    private loadAllUsers()
    {
        this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
    }
}