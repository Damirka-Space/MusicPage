import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PageController } from "src/app/content-pages/page.controller";
import { PageSelector } from "src/app/content-pages/page.selector";
import { PlayerService } from "src/app/services/player.service";
import { APIController } from "src/app/server-api/controller";
import { Card } from "./card";


@Component({
    selector: 'card-component',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss']
})
export class CardComponent {

    @ViewChild('play') playButton!: ElementRef;

    @Input() card!: Card;

    constructor(private router: Router, private playerService : PlayerService) {
    }

    public openPlaylist(event: Event) {
        this.router.navigate(['album', this.card.getId()]);
        // PageController.addParam(this.card.getId());
        // PageController.addParam(new Playlist(this.card.getId(), this.card.getImageUrl(), this.card.getTitle(), this.card.getDescription()));
        // PageSelector.selectPlaylistPage();
    }

    public isPlaying() {
        if(this.playerService.getPlaylistId == this.card.getId()) {
            return this.playerService.isPlaying;
        }
        return false;
    }

    public playPlaylist(event: Event) {
        event.stopPropagation();

        if(this.playerService.getPlaylistId == this.card.getId()) {
            if(this.playerService.isPlaying)
                this.playerService.pause();
            else
                this.playerService.play();
        }
        else {
            this.playerService.loadPlaylistAndPlay(this.card.getId());
        }
    }

}