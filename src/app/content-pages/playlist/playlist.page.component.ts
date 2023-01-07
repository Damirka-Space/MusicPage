import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
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

    constructor(private route: ActivatedRoute, private titleService: Title, private metaService: Meta) {
        super();
        ColorSelector.setBackgroundColor(new LinearGradientBackgroundColorHEX(new ColorHEX("#e52b50"), new ColorHEX("#1f1f1f")));
        ColorSelector.setHeadeColor(new ColorHEX("#e52b5000"));
        ContentBlockComponent.resetScroll();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            APIController.getPlaylist(params['id']).subscribe(data => {
                this.playlist = data;

                this.titleService.setTitle("Альбом - " + this.playlist.getTitle());

                this.metaService.updateTag( { property:"og:title", content:"Альбом - " + this.playlist.getTitle() });
                this.metaService.updateTag( { property:"og:type", content:"website" });
                this.metaService.updateTag( { name:"description", content:this.playlist.getDescription() });
                this.metaService.updateTag( { name: "theme-color", content:"#e52b50" });
                this.metaService.updateTag( { property:"og:url", content:window.location.href });
                this.metaService.updateTag( { property:"og:description", content:this.playlist.getDescription() });
                this.metaService.updateTag( { property:"og:image", content:this.playlist.getImageUrl() });
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