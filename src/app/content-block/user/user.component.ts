import { AfterViewInit, Component } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { APIController } from "src/app/server-api/controller";
import { User } from "../../entities/user";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent implements AfterViewInit {

    protected username: string = "Войти";

    protected user?: User;

    constructor(private cookieService: CookieService, 
        private router: Router, private authService : AuthService,
        private userService: UserService) {
        
    }

    private getUser() {
        APIController.getUser().subscribe(data => {
            this.user = data;
            this.username = this.user.username;

            this.userService.setUser = this.user;
        });
    }

    public ngAfterViewInit(): void {
        if(this.authService.isAuthorized) {
            this.getUser();
        }
        else
            this.authService.istokenReady.add(() => {
                this.getUser();        
            });

    }

    public loginOnClick() {
        if(!this.user) {
            this.cookieService.delete("lastPage");
            this.cookieService.set("lastPage", this.router.url);
            this.authService.login();
        }
        else {
            this.authService.logout().subscribe(val => {
                this.user = undefined;
                this.username = "Войти";
            });
        }

    }


}