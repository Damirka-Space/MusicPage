import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { PageController } from "src/app/content-pages/page.controller";
import { PageSelector } from "src/app/content-pages/page.selector";
import { Playlist } from "src/app/content-pages/playlist/playlist";
import { Card } from "./card";


@Component({
    selector: 'card-component',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss']
})
export class CardComponent {

    @ViewChild('play') playButton!: ElementRef;

    @Input() card!: Card;

    constructor() {
    }

    public openPlaylist(event: Event) {
        if(event.composedPath()[1] == this.playButton.nativeElement)
            return;

        let playlist = new Playlist(this.card.getId(), this.card.getImageUrl(), this.card.getTitle(), this.card.getDescription());
        PageController.addParam(playlist);
        PageSelector.selectPlaylistPage();
    }

    public playPlaylist(event: Event) {
        // console.log(event);
        // TODO: on click play playlist
        
    }

}