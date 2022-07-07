import { Component } from "@angular/core";
import { PageComponent } from "../page.component";
import { Playlist } from "./playlist";

@Component({
    selector: 'playlist-page-component',
    templateUrl: 'playlist.page.component.html',
    styleUrls: ['playlist.page.component.scss']
})
export class PlaylistPageComponent extends PageComponent {

    private playlist!: Playlist;

    constructor() {
        super();
        this.playlist = this.params.pop();
    }

    public getTitle() {
        return this.playlist.getTitle();
    }

    public getImageUrl() {
        return this.playlist.getImageUrl();
    }

    public getDescription() {
        return this.playlist.getDescription();
    }

}