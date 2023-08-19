import { Component, Input } from "@angular/core";
import { Channel } from "src/app/entities/channel";


@Component({
    selector: 'channel-row-component',
    templateUrl: 'channel.row.component.html',
    styleUrls: ['channel.row.component.scss']
})
export class ChannelRowComponent{

    @Input() channel!: Channel;

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
    
}