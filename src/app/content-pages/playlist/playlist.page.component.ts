import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { ContentBlockComponent } from "src/app/content-block/content.block.component";
import { PlayerService } from "src/app/services/player.service";
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

    private downloaded = false;

    constructor(private route: ActivatedRoute, private titleService: Title, private metaService: Meta, private playerService : PlayerService) {
        super();
        ColorSelector.setBackgroundColor(new LinearGradientBackgroundColorHEX(new ColorHEX("#e52b50"), new ColorHEX("#1f1f1f")));
        ColorSelector.setHeadeColor(new ColorHEX("#e52b5000"));
        ContentBlockComponent.resetScroll();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            APIController.getPlaylist(params['id']).subscribe(data => {
                this.playlist = data;

                this.downloaded = true;

                this.titleService.setTitle("Альбом - " + this.playlist.getTitle());

                this.metaService.updateTag( { property:"og:title", content:this.playlist.getTitle() });
                this.metaService.updateTag( { property:"og:description", content:this.playlist.getDescription() });
                this.metaService.updateTag( { property:"og:image", content:this.playlist.getImageUrl() });
                this.metaService.updateTag( { property:"og:type", content:"music.album" });
                this.metaService.updateTag( { name:"description", content:this.playlist.getDescription() });
                this.metaService.updateTag( { name: "theme-color", content:"#e52b50" });
                this.metaService.updateTag( { property:"og:url", content:window.location.href });                
            });
        });
    }

    public get isDownloaded() {
        return this.downloaded;
    }

    public get getTitle() {
        return this.playlist.getTitle();
    }

    public get getType() {
        return this.playlist.getType();
    }

    public get getImageUrl() {
        return this.playlist.getImageUrl();
    }

    public get getDescription() {
        return this.playlist.getDescription();
    }

    public get getId() {
        return this.playlist.getId();
    }

    public get isLiked() {
        return this.playlist.isLiked();
    }

    public get isPlaying() {
        if(this.playerService.getPlaylistId == this.playlist.getId()) {
            return this.playerService.isPlaying;
        }
        return false;
    }

    public likeAlbum() {
        APIController.likeAlbum(this.playlist.getId());

        if(!this.playlist.isLiked())
            this.playlist.setLike(true);
        else
            this.playlist.setLike(false);
    }

    public play() {
        if(this.playerService.getPlaylistId == this.playlist.getId()) {
            if(this.playerService.isPlaying)
                this.playerService.pause();
            else
                this.playerService.play();
        }
        else {
            this.playerService.loadPlaylistAndPlay(this.playlist.getId());
        }
    }

}