import { environment } from "src/environments/environment";
import { PlaylistTableComponent } from "../content-pages/playlist/table/playlist.table.component";
import { Track } from "../content-pages/playlist/table/track";
import { PlayerComponent } from "../player-block/player.component";
import { APIController } from "../server-api/controller";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

import {Howl, Howler} from 'howler';

@Injectable({
    providedIn : 'root'
})
export class PlayerService {

    private playerComponent!: PlayerComponent;
    private playlistTableComponent!: PlaylistTableComponent;
    private currentPlaylist!: Track[];
    private playlistId!: number;
    private currentIndex!: number;

    private volume : number = 0.25;
    private repeat : boolean = false;
    private playing : boolean = false;

    private currentTrack!: Howl;;

    public constructor(private authService : AuthService) {

    }

    public setPlayerComponent(playerComponent: PlayerComponent) {
        this.playerComponent = playerComponent;

        try {
            navigator.mediaSession.setActionHandler('play', () => {
                this.play();
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                this.pause();
            });
            navigator.mediaSession.setActionHandler('previoustrack', () => {
                this.playPrev
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                this.playNext();
            });
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

    public set setVolume(value: number) {
        this.volume = value;
        Howler.volume(this.volume);
    }

    public get getPlaylist() : Track[] {
        return this.currentPlaylist;
    }

    public get getPlaylistId() : number {
        return this.playlistId;
    }

    public get getCurrentIndex() : number {
        return this.currentIndex;
    }

    public get getPos() : number {
        return this.currentTrack.seek();
    }

    public get getDuration() : number {
        return this.currentTrack.duration();
    }

    public get isRepeate() : boolean {
        return this.repeat;
    }

    public seek(value: number) {
        this.currentTrack.seek(value,);
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
        
        if(this.authService.isAuthorized)
            APIController.saveToHistoryTrack(track.getId());

        this.playerComponent.setMetadata(track.getTitle(), track.getAuthor().join(", "), track.getMetadataImageUrl());


        if(this.currentTrack) {
            this.currentTrack.stop();
            this.currentTrack.unload();
        }
            
        this.currentTrack = new Howl({
            src: [track.getUrl()],
            html5: true,
            loop: this.repeat
        });

        this.currentTrack.on('end', () => {
            if(!this.isRepeate)
                this.playNext();
            else {
                this.seek(0);
                this.play();
            }

        });

        this.play();
    }

    public get isPlaying() {
        return this.playing;
    }

    public set setRepeat(value: boolean) {
        this.repeat = value;
    }

    public play() {
        this.playing = true;
        this.currentTrack.play();
    }

    public pause() {
        this.playing = false;
        this.currentTrack.pause();
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