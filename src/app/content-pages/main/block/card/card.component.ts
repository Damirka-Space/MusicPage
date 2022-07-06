import { Component, Input } from "@angular/core";
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
    @Input() card!: Card;

    constructor() {
    }

    public onClick() {
        let playlist = new Playlist(this.card.getId(), this.card.getImageUrl(), this.card.getTitle(), this.card.getDescription());
        PageController.addParam(playlist);
        PageSelector.selectPlaylistPage();
    }

}