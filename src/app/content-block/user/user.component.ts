import { AfterViewInit, Component } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { APIController } from "src/app/server-api/controller";
import { environment } from "src/environments/environment";
import { User } from "../../entities/user";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { of } from "rxjs";

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent implements AfterViewInit {

    protected username: string = "Войти";

    protected user?: User;

    constructor(private cookieService: CookieService, private router: Router, private authService : AuthService) {
        
    }

    private getUser() {
        APIController.getUser().subscribe(data => {
            this.user = data;
            this.username = this.user.username;
        
            var l = this.cookieService.get("lastPage");
            this.cookieService.delete("lastPage");
            this.router.navigateByUrl(l);
        });
    }

    public ngAfterViewInit(): void {
        if(this.authService.getAccessToken)
            this.getUser();
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