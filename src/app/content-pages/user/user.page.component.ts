import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { ContentBlockComponent } from "src/app/content-block/content.block.component";
import { PlayerService } from "src/app/services/player.service";
import { APIController } from "src/app/server-api/controller";
import { LinearGradientBackgroundColorHEX } from "../background.color";
import { ColorHEX } from "../color";
import { ColorSelector } from "../color.selector";
import { PageComponent } from "../page.component";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'user-page-component',
    templateUrl: 'user.page.component.html',
    styleUrls: ['user.page.component.scss']
})
export class UserPageComponent extends PageComponent {

    private status: string = 'Fail';

    constructor(private route: ActivatedRoute, private titleService: Title, private metaService: Meta, private authService : AuthService) {
        super();
        // ColorSelector.setBackgroundColor(new LinearGradientBackgroundColorHEX(new ColorHEX("#e52b50"), new ColorHEX("#1f1f1f")));
        // ColorSelector.setHeadeColor(new ColorHEX("#e52b5000"));
        ContentBlockComponent.resetScroll();
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let code = params['code'];
            this.authService.getTokens(code);
            this.status = "Success";
        });
    }

    public get getStatus() : string {
        return this.status;
    }
}