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

    private loadMessages(channelId: number) {
        APIController.getChat(this.channelId).subscribe((messages) => {
            this.messages = messages;
            this.isDownloading = false;
            console.log(this.messages);


            {
                var msg = new Message();
                msg.created = Date.now();
                msg.message = "Hello, World";
                msg.sender = "Test2";
    
                this.messages.splice(0, 0, msg);
            }
    
            {
                var msg = new Message();
                msg.created = Date.now();
                msg.message = "T21";
                msg.sender = "Test2";
    
                this.messages.splice(0, 0, msg);
            }
    
            {
                var msg = new Message();
                msg.created = Date.now();
                msg.message = "Абракадабра";
                msg.sender = "Test2";
    
                this.messages.splice(0, 0, msg);
            }
        })
    }

    ngAfterViewInit() {
        this.route.params.subscribe(params => {
            this.channelId = params['id'];

            if(this.authService.isAuthorized) {
                this.loadMessages(this.channelId);
            }
            else {
                this.authService.istokenReady.add(() => {
                    this.loadMessages(this.channelId);
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

        this.messages.splice(0, 0, msg);
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