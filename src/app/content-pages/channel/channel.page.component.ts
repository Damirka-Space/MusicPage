import { Component, Output } from "@angular/core";
import { PageComponent } from "../page.component";
import { APIController } from "src/app/server-api/controller";
import { AuthService } from "src/app/services/auth.service";
import { Channel } from "src/app/entities/channel";



@Component({
    selector: 'channel-page-component',
    templateUrl: 'channel.page.component.html',
    styleUrls: ['channel.page.component.scss']
})
export class ChannelPageComponent extends PageComponent {

    @Output() protected channels: Channel[] = [];

    constructor(private authService: AuthService) {
        super();
    }

    public get Channels() {
        return this.channels;
    }

    private loadChannels() {
        APIController.channelPage().subscribe((channels) => {
            this.channels = channels;
        })
    }

    ngAfterViewInit() {
        if(this.authService.isAuthorized) {
            this.loadChannels();  
        }
        else {
            this.authService.istokenReady.add(() => {
                this.loadChannels();
            })
        }
        
    }

}