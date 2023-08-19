import { Injectable } from "@angular/core";
import { RxStompService } from "./rx-stomp.service";
import { channelRxStompConfig } from "../config/stomp.config";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn : 'root'
})
export class ChannelService {

    private connected = false;

    constructor(private stompService: RxStompService, private authService: AuthService) {
        
    }

    public connect(channelId: number) {
        const message = {
            channelId: channelId,
            created: new Date(),
            content: "Hello, world!",
            action: "CONNECT",
        };

        this.stompService.publish(
            { destination: '/channel/events',
              headers: this.authService.getHeaders,
              body: JSON.stringify(message) }
        )
    }

    private disconnect(channelId: number) {
        const message = {
            channelId: channelId,
            created: new Date(),
            content: "Hello, world!",
            action: "DISCONNECT",
        };

        this.stompService.publish(
            { destination: '/channel/events',
              headers: this.authService.getHeaders,
              body: JSON.stringify(message) }
        )

        this.stompService.deactivate();
        this.connected = false;
    }

    public sendMessage(channelId: number, message: string) {
        const msg = {
            channelId: channelId,
            created: new Date(),
            content: message,
            action: "MESSAGE",
        };

        this.stompService.publish(
            { destination: '/channel/events',
              headers: this.authService.getHeaders,
              body: JSON.stringify(msg) }
        )
    }

    public handleEvent(data: any) {
        console.log(data.body);
    }

    public connectToChannel(channelId: number) {
        if(this.connected) {
            this.disconnect(channelId);
        }

        channelRxStompConfig.connectHeaders = this.authService.getHeaders

        this.stompService.configure(channelRxStompConfig);
        this.stompService.activate();

        this.connect(channelId);

        this.connected = true;

        return this.stompService.watch("/channel/" + channelId.toString() + "/queue/events");
    }

}