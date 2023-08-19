import { Injectable } from "@angular/core";
import { RxStompService } from "./rx-stomp.service";


@Injectable({
    providedIn : 'root'
})
export class ChannelService {

    private connected = false;

    constructor(private stompService: RxStompService) {
        
    }

    public connectToChannel(channelId: number) {
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
    }

}