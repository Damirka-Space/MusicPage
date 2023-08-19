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

@Component({
    selector: 'room-page-component',
    templateUrl: 'room.page.component.html',
    styleUrls: ['room.page.component.scss']
})
export class RoomPageComponent extends PageComponent {

    @Output() protected messages: Message[] = []

    message: string = ""

    channelId = 0;

    isDownloading = true;

    constructor(private channelService: ChannelService, private userService: UserService,
        private route: ActivatedRoute, private authService: AuthService) {
        super();
        // ColorSelector.setBackgroundColor(new ColorHEX("#eaa2fc50"));
        ColorSelector.setHeadeColor(new ColorHEX("#d57eeb6d"));
        ContentBlockComponent.canScroll = false;
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
        APIController.getChat(this.channelId).subscribe((messages) => {
            
            this.messages = messages.reverse();
            this.isDownloading = false;

            this.channelService.connectToChannel(this.channelId)
            .subscribe((data) => {
                this.handleEvent(data);
            })
        })
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

    onKeyDownEvent(event: any) {    
        var msg = new Message();
        msg.created = Date.now();
        msg.message = this.message;
        msg.sender = this.userService.getUser.username;

        this.message = "";

        this.channelService.sendMessage(this.channelId, msg.message);
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