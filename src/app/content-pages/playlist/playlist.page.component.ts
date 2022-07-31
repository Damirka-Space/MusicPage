import { Component } from "@angular/core";
import { APIController } from "src/app/server-api/controller";
import { LinearGradientBackgroundColorHEX } from "../background.color";
import { ColorHEX } from "../color";
import { ColorSelector } from "../color.selector";
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
        APIController.getPlaylist(this.params.pop()).subscribe(data => {
            this.playlist = data;
        });

        ColorSelector.setBackgroundColor(new LinearGradientBackgroundColorHEX(new ColorHEX("#e52b50"), new ColorHEX("#1f1f1f")));
        ColorSelector.setHeadeColor(new ColorHEX("#e52b5000"));
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

    public getId() {
        return this.playlist.getId();
    }

}