import { Component, Output } from "@angular/core";
import { PageComponent } from "../page.component";
import { APIController } from "src/app/server-api/controller";
import { AuthService } from "src/app/services/auth.service";
import { Channel } from "src/app/entities/channel";
import { Meta, Title } from "@angular/platform-browser";



@Component({
    selector: 'channel-page-component',
    templateUrl: 'channel.page.component.html',
    styleUrls: ['channel.page.component.scss']
})
export class ChannelPageComponent extends PageComponent {

    @Output() protected channels: Channel[] = [];

    constructor(private titleService: Title, private metaService: Meta,
        private authService: AuthService) {
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

    public get isAuthorized() {
        return this.authService.isAuthorized
    }

    ngOnInit() {
        this.titleService.setTitle("Страница каналов");
        this.metaService.updateTag( { property:"og:title",content:"Страница каналов"});
        this.metaService.updateTag( { property:"og:type",content:"website"});
        //this.metaService.updateTag( { property:"og:url",content:window.location.href});
        this.metaService.updateTag( { name:"description",content:"Место, где можно попросить воды"});
        this.metaService.updateTag( { property:"og:description",content:"Место, где можно попросить воды"});
        this.metaService.updateTag( { name: "theme-color", content:"#121212" });
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