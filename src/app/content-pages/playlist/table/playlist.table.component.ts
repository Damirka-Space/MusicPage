import { Component, ElementRef, Input, Output, ViewChild } from "@angular/core";
import { PlayerService } from "src/app/services/player.service";
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

    constructor(private playerService : PlayerService) {
        this.playerService.setPlaylistComponent(this);
    }

    public selectTrack(index: number, playlistId : number) {
        if(this.playlistId == playlistId)
            this.selectedTrack = this.tracks[index];
    }

    public getTracks() {
        return this.tracks;
    }

    public onClick(track : Track) {
        this.selectedTrack = track;
        this.playerService.seek(0);
        this.playerService.setPlaylist(this.tracks, this.playlistId);
        this.playerService.playTrack(track);
    }

    ngOnInit() {
        try {
            window.addEventListener("scroll", this.onScroll, true);
        } catch (error) {
            console.log(error)
        }

        APIController.getTracks(this.playlistId).subscribe(data => {
            this.tracks = data;

            if(this.playerService.getPlaylistId() == this.playlistId) {
                this.selectedTrack = this.tracks[this.playerService.getCurrentIndex()];
            }
        });
    }

    ngOnDestroy() {
        try {
            window.removeEventListener("scroll", this.onScroll, true);
        } catch (error) {
            console.log(error)
        }
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

    public isTrackLiked(track: Track) {
        return track.getLiked();
    }

    public likeTrack(track: Track, event: Event) {
        event.stopPropagation();

        APIController.likeTrack(track.getId());

        if(track.getLiked())
            track.setLiked(false);
        else
            track.setLiked(true);
    }

}

