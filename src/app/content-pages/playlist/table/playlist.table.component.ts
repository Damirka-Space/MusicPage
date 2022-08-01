import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ContentBlockComponent } from "src/app/content-block/content.block.component";
import { Player } from "src/app/player/player";
import { APIController } from "src/app/server-api/controller";
import { ContentBlock } from "../../content.block";
import { Track } from "./track";


@Component({
    selector: 'playlist-table-component',
    templateUrl: 'playlist.table.component.html',
    styleUrls: ['playlist.table.component.scss']
})
export class PlaylistTableComponent {
    @Input() playlistId!: number;
    private tracks!: Track[];

    displayedColumns: string[] = ['position', 'title', 'album', 'time', 'info'];
    selectedTrack!: Track;

    @ViewChild('table', {read: ElementRef})
    _div!: ElementRef;

    private static div : HTMLElement;
    private static coloredHeader: boolean = false;
     

    constructor() {
        Player.setPlaylistComponent(this);
    }
    
    public selectTrack(track: Track, tracks: Track[]) {
        if(tracks == this.tracks)
            this.selectedTrack = track;
    }

    public getTracks() {
        return this.tracks;
    }

    public onClick(track : Track) {
        if(this.selectedTrack == track)
            return;

        this.selectedTrack = track;
        Player.setPlaylist(this.tracks);
        Player.playTrack(track);
    }

    ngOnInit() {
        window.addEventListener("scroll", this.onScroll, true);

        APIController.getTracks(this.playlistId).subscribe(data => {
            this.tracks = data;
        });
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

