import { AfterViewInit, Component } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { APIController } from "src/app/server-api/controller";
import { environment } from "src/environments/environment";
import { User } from "./user";

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent implements AfterViewInit {

    protected username: string = "Войти";

    protected user?: User;

    constructor(private cookieService: CookieService) {
        
    }

    public ngAfterViewInit(): void {
        APIController.getUser().subscribe(data => {
            this.user = data;
            this.username = this.user.username;
        });
    }

    public loginOnClick() {
        if(!this.user)
            document.location.href = environment.api_login;
        else {
            APIController.logout().subscribe(val => {
                this.user = undefined;
                this.username = "Войти";
            });
        }

    }


}