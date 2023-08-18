import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ContentBlockComponent } from "src/app/content-block/content.block.component";
import { PageComponent } from "../page.component";
import { AuthService } from "src/app/services/auth.service";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: 'user-page-component',
    templateUrl: 'user.page.component.html',
    styleUrls: ['user.page.component.scss']
})
export class UserPageComponent extends PageComponent {

    private status: string = 'Fail';

    constructor(private route: ActivatedRoute, private titleService: Title, 
        private metaService: Meta, private authService : AuthService, 
        private cookieService : CookieService,
        private router : Router) {
        super();
        // ColorSelector.setBackgroundColor(new LinearGradientBackgroundColorHEX(new ColorHEX("#e52b50"), new ColorHEX("#1f1f1f")));
        // ColorSelector.setHeadeColor(new ColorHEX("#e52b5000"));
        ContentBlockComponent.resetScroll();
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let code = params['code'];
            this.authService.getTokens(code);
            
            this.authService.istokenReady.add(() => {
                this.status = "Success";

                var l = this.cookieService.get("lastPage");
                this.cookieService.delete("lastPage");
                this.router.navigateByUrl(l);
            })
        });
    }

    public get getStatus() : string {
        return this.status;
    }
}