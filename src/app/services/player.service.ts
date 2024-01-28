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

    private skipTime = 10; // Time to skip in seconds

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
                this.playPrev()
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                this.playNext();
            });

            navigator.mediaSession.setActionHandler("seekbackward", (evt) => {
                const skipTime = evt.seekOffset || this.skipTime;
                this.seek(Math.max(this.getPos - skipTime, 0));
                this.update();
            });
            
            navigator.mediaSession.setActionHandler("seekforward", (evt) => {
                const skipTime = evt.seekOffset || this.skipTime;
                this.seek(Math.min(this.getPos + skipTime, this.getDuration));
                this.update();
            });
            
            navigator.mediaSession.setActionHandler('seekto', (evt) => {
                const seekTime = evt.seekTime as number;
                this.seek(seekTime);
                this.update();
            });

            navigator.mediaSession.setActionHandler('stop', () => {
                this.pause();
            });

        } catch (error) {
            //console.log(error);
        }    

            // navigator.mediaSession.setActionHandler('skipad', function() { /* Code excerpted. */ });
    }

    public update() {
        if(!navigator.mediaSession)
            return;

        navigator.mediaSession.setPositionState({
            duration: this.getDuration,
            playbackRate: this.currentTrack.rate(),
            position: this.getPos
          });
    }

    public setPlaylistComponent(playlistComponent: PlaylistTableComponent) {
        this.playlistTableComponent = playlistComponent;
    }

    public setPlaylist(tracks: Track[], playlistId : number) {
        if(playlistId != this.playlistId)
        {
            this.currentPlaylist = tracks;
            this.playlistId = playlistId;

            if(this.authService.isAuthorized)
                APIController.saveAlbumToHistoryTrack(playlistId);
        }
    }

    public loadPlaylistAndPlay(playlistId: number) {
        APIController.getTracks(playlistId).subscribe(data => {
            this.setPlaylist(data, playlistId);

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

    private updateMetadata(track: Track) {
        if(!navigator.mediaSession)
            return;

        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.getTitle(),
            artist: track.getAuthor().join(", "),
            album: track.getAlbum(),
            artwork: [
                // { sizes: "256x256", src: track.getImageUrl(), type: "image/jpeg"},
                // { sizes: "512x512", src: track.getMetadataImageUrl(), type: 'image/jpeg'},
                // { sizes: "1024x1024", src: track.getMetadataImageUrl(), type: 'image/jpeg'},
                { src: track.getImageUrl(), type: 'image/jpeg' },
                { src: track.getMetadataImageUrl(), type: 'image/jpeg' }
            ]}
        );
    }


    public playTrack(track: Track) {
        if(this.currentTrack) {
            this.pause();
            this.currentTrack.stop();
            this.currentTrack.unload();
        }

        this.currentIndex = track.getIndex() - 1;

        if(this.currentPlaylist)
            if(this.playlistTableComponent)
                this.playlistTableComponent.selectTrack(this.currentIndex, this.playlistId);
        
        if(this.authService.isAuthorized)
            APIController.saveToHistoryTrack(track.getId());

        this.playerComponent.setMetadata(track.getTitle(), track.getAuthor().join(", "), track.getMetadataImageUrl());
        this.updateMetadata(track);
            
        this.currentTrack = new Howl({
            src: [ track.getUrl() ],
            html5: true,
            loop: this.repeat,
            format: ['mp3'],
            onend : () => {
                if(!this.isRepeate)
                    this.playNext();
                else {
                    this.seek(0);
                    this.play();
                }
            },

            onload: () => {
                this.play();
            },

            onloaderror: (id?, error?) => {
                console.log(error);
                this.playTrack(track);
            },

            onplayerror: (id?, error?) => {
                console.log(error);
                this.playTrack(track);
            }
            
        });

    }

    public get isPlaying() {
        return this.playing;
    }

    public set setRepeat(value: boolean) {
        this.repeat = value;
    }

    public play() {
        this.currentTrack.play();
        this.playing = true;

        if(navigator.mediaSession)
            navigator.mediaSession.playbackState = 'playing';
    }

    public pause() {
        this.currentTrack.pause();
        this.playing = false;

        if(navigator.mediaSession)
            navigator.mediaSession.playbackState = 'paused';
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