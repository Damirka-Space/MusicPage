import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { PageController } from "src/app/content-pages/page.controller";
import { PageSelector } from "src/app/content-pages/page.selector";
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

    constructor() {
    }

    public openPlaylist(event: Event) {
        if(event.composedPath()[1] == this.playButton.nativeElement)
            return;

        PageController.addParam(this.card.getId());
        // PageController.addParam(new Playlist(this.card.getId(), this.card.getImageUrl(), this.card.getTitle(), this.card.getDescription()));
        PageSelector.selectPlaylistPage();
    }

    public playPlaylist(event: Event) {
        // console.log(event);
        // TODO: on click play playlist
        
    }

}