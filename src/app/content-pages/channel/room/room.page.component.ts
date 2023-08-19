import { Component} from "@angular/core";
import { PageComponent } from "../../page.component";
import { ChannelService } from "src/app/services/channel.service";
import { ColorSelector } from "../../color.selector";
import { LinearGradientBackgroundColorHEX } from "../../background.color";
import { ColorHEX } from "../../color";

@Component({
    selector: 'room-page-component',
    templateUrl: 'room.page.component.html',
    styleUrls: ['room.page.component.scss']
})
export class RoomPageComponent extends PageComponent {

    constructor(private channelService: ChannelService) {
        super();
        // ColorSelector.setBackgroundColor(new ColorHEX("#eaa2fc50"));
        ColorSelector.setHeadeColor(new ColorHEX("#d57eeb4d"));
    }

}