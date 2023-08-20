import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Channel } from "src/app/entities/channel";
import { ChannelService } from "src/app/services/channel.service";


@Component({
    selector: 'channel-row-component',
    templateUrl: 'channel.row.component.html',
    styleUrls: ['channel.row.component.scss']
})
export class ChannelRowComponent{

    @Input() channel!: Channel;

    constructor(private router: Router, private channelService: ChannelService) {

    }

    public get Title() {
        return this.channel.title
    }

    public get Description() {
        return this.channel.description
    }
    public get UserCount() {
        return this.channel.userCount
    }
    public get Owner() {
        return this.channel.ownerUsername
    }

    public openChannel(event: Event) {
        this.channelService.Channel = this.channel;
        this.router.navigate(['channel', this.channel.id]);
    }
    
}