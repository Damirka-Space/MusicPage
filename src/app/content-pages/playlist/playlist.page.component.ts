import { Component } from "@angular/core";
import { PageComponent } from "../page.component";

@Component({
    selector: 'playlist-page-component',
    templateUrl: 'playlist.page.component.html',
    styleUrls: ['playlist.page.component.scss']
})
export class PlaylistPageComponent extends PageComponent {

    constructor() {
        super();
        
    }
}