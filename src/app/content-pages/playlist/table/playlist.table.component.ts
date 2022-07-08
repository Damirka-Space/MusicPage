import { Component, ElementRef, ViewChild } from "@angular/core";
import { ContentBlockComponent } from "src/app/content-block/content.block.component";
import { ContentBlock } from "../../content.block";
import { Track } from "./track";


@Component({
    selector: 'playlist-table-component',
    templateUrl: 'playlist.table.component.html',
    styleUrls: ['playlist.table.component.scss']
})
export class PlaylistTableComponent {
    private tracks!: Track[];

    displayedColumns: string[] = ['position', 'title', 'album', 'time', 'info'];
    selectedTrack!: Track;

    @ViewChild('table', {read: ElementRef})
    _div!: ElementRef;

    private static div : HTMLElement;
    private static coloredHeader: boolean = false;
     

    constructor() {
        this.tracks = [];

        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
        this.tracks.push(Track.nullTrack());
    }

    public getTracks() {
        return this.tracks;
    }

    public onClick(track : Track) {
        this.selectedTrack = track;
    }

    ngOnInit() {
        window.addEventListener("scroll", this.onScroll, true);
    }

    ngOnDestroy() {
        window.removeEventListener("scroll", this.onScroll, true);
    }

    ngAfterViewInit() {
        PlaylistTableComponent.div = this._div.nativeElement;

    }

    private onScroll() {
        var v = ContentBlock.getDivScrollTop() / (PlaylistTableComponent.div.offsetTop - ContentBlock.getHeaderHight());
        if(v > 1)
            PlaylistTableComponent.coloredHeader = true;
        else
            PlaylistTableComponent.coloredHeader = false;
    }

    public isColored() {
        return PlaylistTableComponent.coloredHeader;
    }

}

