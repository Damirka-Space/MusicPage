import { AfterViewInit, Component } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { APIController } from "src/app/server-api/controller";
import { environment } from "src/environments/environment";
import { User } from "../../entities/user";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { of } from "rxjs";
import { RxStompService } from "src/app/services/rx-stomp.service";
import { channelRxStompConfig } from "src/app/config/stomp.config";

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent implements AfterViewInit {

    protected username: string = "Войти";

    protected user?: User;

    constructor(private cookieService: CookieService, private router: Router, private authService : AuthService,
        private stompService: RxStompService) {
        
    }

    private getUser() {
        APIController.getUser().subscribe(data => {
            this.user = data;
            this.username = this.user.username;
            
            // channelRxStompConfig.connectHeaders = this.authService.getHeaders

            // this.stompService.configure(channelRxStompConfig);
            // this.stompService.activate();

            // const message = {
            //     channelId: 1,
            //     created: new Date(),
            //     content: "Hello, world!",
            //     action: "MESSAGE",
            //   };

            // this.stompService.publish(
            //     { destination: '/channel/events',
            //       headers: this.authService.getHeaders,
            //       body: JSON.stringify(message) }
            // )

            // this.stompService.watch("/channel/1/queue/events")
            // .subscribe((data) => {
            //     console.log(data.body);
            // })
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