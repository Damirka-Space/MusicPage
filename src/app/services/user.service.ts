import { Injectable } from "@angular/core";
import { User } from "../entities/user";



@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user !: User;


    constructor() {
    }


    public get getUser() {
        return this.user;
    }
}