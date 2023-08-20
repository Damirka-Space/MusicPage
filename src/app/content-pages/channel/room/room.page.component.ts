import { Component, Output} from "@angular/core";
import { PageComponent } from "../../page.component";
import { ChannelService } from "src/app/services/channel.service";
import { ColorSelector } from "../../color.selector";
import { ColorHEX } from "../../color";
import { Message } from "src/app/entities/message";
import { UserService } from "src/app/services/user.service";
import { ContentBlockComponent } from "src/app/content-block/content.block.component";
import { APIController } from "src/app/server-api/controller";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Payload } from "src/app/entities/payload";
import { Meta, Title } from "@angular/platform-browser";
import { Channel } from "src/app/entities/channel";

@Component({
    selector: 'room-page-component',
    templateUrl: 'room.page.component.html',
    styleUrls: ['room.page.component.scss']
})
export class RoomPageComponent extends PageComponent {

    @Output() protected messages: Message[] = []

    private channel!: Channel;

    message: string = ""

    channelId = 0;

    isDownloading = true;

    constructor(
        private titleService: Title, private metaService: Meta,
        private channelService: ChannelService, private userService: UserService,
        private route: ActivatedRoute, private authService: AuthService) {
        super();
        // ColorSelector.setBackgroundColor(new ColorHEX("#eaa2fc50"));
        ColorSelector.setHeadeColor(new ColorHEX("#d57eeb6d"));
        ContentBlockComponent.canScroll = false;
    }

    public get Title() {
        return this.channel.title;
    }

    public get Description() {
        return this.channel.description;
    }
    public get UserCount() {
        return this.channel.userCount;
    }
    public get Owner() {
        return this.channel.ownerUsername;
    }

    private handleEvent(data: any) {
        var payload = JSON.parse(data.body) as Payload;

        if(payload.action == "MESSAGE") {
            var msg = new Message();
            msg.created = payload.created;
            msg.message = payload.content;
            msg.sender = payload.from;

            this.messages.splice(0, 0, msg);
        }
        
    }

    private loadMessages() {
        APIController.getChannel(this.channelId).subscribe((channel) => {
            this.channel = channel;

            var title = "Канал №" + this.channelId.toString();
            this.titleService.setTitle(title);
            this.metaService.updateTag( { property:"og:title",content:title});
            this.metaService.updateTag( { property:"og:type",content:"website"});
            this.metaService.updateTag( { property:"og:url",content:window.location.href});
            this.metaService.updateTag( { name:"description",content:"Место, где можно попросить воды"});
            this.metaService.updateTag( { property:"og:description",content:"Место, где можно попросить воды"});
            this.metaService.updateTag( { name: "theme-color", content:"#121212" });  

            APIController.getChat(this.channelId).subscribe((messages) => {
            
                this.messages = messages.reverse();
                this.isDownloading = false;
                this.channelService.connectToChannel(this.channelId)
                .subscribe((data) => {
                    this.handleEvent(data);
                })
            })
        });
    }

    public get isAuthorized() {
        return this.authService.isAuthorized
    }

    ngAfterViewInit() {
        this.route.params.subscribe(params => {
            this.channelId = params['id'];

            if(this.authService.isAuthorized) {
                this.loadMessages();
            }
            else {
                this.authService.istokenReady.add(() => {
                    this.loadMessages();
                })
            }
        });
    }

    onKeyDown(event: KeyboardEvent) {
        if(event.ctrlKey && event.key === "Enter") {
            this.sendMessage(event);
        }
    }

    sendMessage(event: any) {    
        if(this.message != "") {
            var msg = new Message();
            msg.created = Date.now();
            msg.message = this.message;
            msg.sender = this.userService.getUser.username;

            this.message = "";

            this.channelService.sendMessage(this.channelId, msg.message);
        }
    }

    public convertDate(created: number) {
        return new Date(created).toLocaleString('en-GB');
    }

    public isMyMessage(message: Message) {
        return message.sender == this.userService.getUser?.username;
    }

    public get isEmpty() {
        return this.messages.length == 0;
    }

}