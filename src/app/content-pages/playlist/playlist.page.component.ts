import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContentBlockComponent } from "src/app/content-block/content.block.component";
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

    constructor(private route: ActivatedRoute) {
        super();
        ColorSelector.setBackgroundColor(new LinearGradientBackgroundColorHEX(new ColorHEX("#e52b50"), new ColorHEX("#1f1f1f")));
        ColorSelector.setHeadeColor(new ColorHEX("#e52b5000"));
        ContentBlockComponent.resetScroll();
    }

    public ngOnInit() {
        this.route.params.subscribe(params => {
            APIController.getPlaylist(params['id']).subscribe(data => {
                this.playlist = data;
            });
        });
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