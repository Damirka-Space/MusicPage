import { environment } from "src/environments/environment";
import { PlaylistTableComponent } from "../content-pages/playlist/table/playlist.table.component";
import { Track } from "../content-pages/playlist/table/track";
import { PlayerComponent } from "../player-block/player.component";
import { APIController } from "../server-api/controller";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn : 'root'
})
export class PlayerService {

    private playerComponent!: PlayerComponent;
    private playlistTableComponent!: PlaylistTableComponent;
    private currentPlaylist!: Track[];
    private playlistId!: number;
    private currentIndex!: number;

    public constructor(private authService : AuthService) {
            
    }

    public setPlayerComponent(playerComponent: PlayerComponent) {
        this.playerComponent = playerComponent;

        try {
            navigator.mediaSession.setActionHandler('play', this.play);
            navigator.mediaSession.setActionHandler('pause', this.pause);
            navigator.mediaSession.setActionHandler('previoustrack', this.playPrev);
            navigator.mediaSession.setActionHandler('nexttrack', this.playNext);
        } catch (error) {
            console.log(error);
        }    

            // navigator.mediaSession.setActionHandler('stop', );
            // navigator.mediaSession.setActionHandler('seekbackward', function() { /* Code excerpted. */ });
            // navigator.mediaSession.setActionHandler('seekforward', function() { /* Code excerpted. */ });
            // navigator.mediaSession.setActionHandler('seekto', function() { /* Code excerpted. */ });
            // navigator.mediaSession.setActionHandler('skipad', function() { /* Code excerpted. */ });
    }

    public setPlaylistComponent(playlistComponent: PlaylistTableComponent) {
        this.playlistTableComponent = playlistComponent;
    }

    public setPlaylist(tracks: Track[], playlistId : number) {
        this.currentPlaylist = tracks;
        this.playlistId = playlistId;
    }

    public loadPlaylistAndPlay(playlistId: number) {
        APIController.getTracks(playlistId).subscribe(data => {
            this.currentPlaylist = data;
            this.playlistId = playlistId;
            this.playTrack(this.currentPlaylist[0]);
        });
    }

    public getPlaylist() : Track[] {
        return this.currentPlaylist;
    }

    public getPlaylistId() : number {
        return this.playlistId;
    }

    public getCurrentIndex() : number {
        return this.currentIndex;
    }

    public seek(value: number) {
        this.playerComponent.seek(value);
    }

    public update() {
        this.playerComponent.update();
    }

    public playTrack(track: Track) {
        if(navigator.mediaSession) {
            let mediaMetadata = new MediaMetadata();
            mediaMetadata.title = track.getTitle();
            mediaMetadata.artist = track.getAuthor().join(", ");
            mediaMetadata.album = track.getAlbum();
            mediaMetadata.artwork = [
                { sizes: "256x256", src: track.getImageUrl(), type: "image/jpeg"},
                { sizes: "512x512", src: track.getMetadataImageUrl(), type: 'image/jpeg'},
                { sizes: "1024x1024", src: track.getMetadataImageUrl(), type: 'image/jpeg'},
            ];

            navigator.mediaSession.metadata = mediaMetadata;   
        }

        this.currentIndex = track.getIndex() - 1;

        if(this.currentPlaylist)
            if(this.playlistTableComponent)
                this.playlistTableComponent.selectTrack(this.currentIndex, this.playlistId);
        

        this.playerComponent.setSource(track.getUrl());
        this.playerComponent.setMetadata(track.getTitle(), track.getAuthor().join(", "), track.getMetadataImageUrl());

        if(this.authService.isAuthorized)
            APIController.saveToHistoryTrack(track.getId());

        this.playerComponent.play();
    }

    public isPlaying() {
        return this.playerComponent.isPlaying();
    }

    public play() {
        this.playerComponent.play();
    }

    public pause() {
        this.playerComponent.pause();
    }

    public playNext() {
        if(++this.currentIndex > this.currentPlaylist.length - 1)
        this.playTrack(this.currentPlaylist[0]);
        else
            this.playTrack(this.currentPlaylist[this.currentIndex]);
    }

    public playPrev() {
        if(--this.currentIndex < 0)
            this.playTrack(this.currentPlaylist[this.currentPlaylist.length - 1]);
        else
            this.playTrack(this.currentPlaylist[this.currentIndex]);
    }
}