import { Component, ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { Track } from "../content-pages/playlist/table/track";
import { Player } from "../player/player";
import { APIController } from "../server-api/controller";

@Component({
    selector: 'player-component',
    templateUrl: 'player.component.html',
    styleUrls: ['player.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlayerComponent {
    @ViewChild('player', {read: ElementRef})
    _player!: ElementRef;

    @ViewChild('source', {read: ElementRef})
    _source!: ElementRef;

    private sourceUrl: string = "";

    constructor() {
    }

    ngAfterViewInit() {
        // this._player.nativeElement.autoplay = true;
        // this._player.nativeElement.volume = 0.03;
        // this._player.nativeElement.controls = false;
        // this._player.nativeElement.loop = false;

        this._player.nativeElement.addEventListener("ended", Player.playNext);

        Player.setPlayerComponent(this);

        // if ('mediaSession' in navigator) {
        //     navigator.mediaSession.metadata = new MediaMetadata({
        //       title: 'Unforgettable',
        //       artist: 'Nat King Cole',
        //       album: 'The Ultimate Collection (Remastered)',
        //       artwork: [
        //         { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
        //       ]
        //     });
          
        //     navigator.mediaSession.setActionHandler('play', function() { /* Code excerpted. */ });
        //     navigator.mediaSession.setActionHandler('pause', function() { /* Code excerpted. */ });
        //     navigator.mediaSession.setActionHandler('stop', function() { /* Code excerpted. */ });
        //     navigator.mediaSession.setActionHandler('seekbackward', function() { /* Code excerpted. */ });
        //     navigator.mediaSession.setActionHandler('seekforward', function() { /* Code excerpted. */ });
        //     navigator.mediaSession.setActionHandler('seekto', function() { /* Code excerpted. */ });
        //     navigator.mediaSession.setActionHandler('previoustrack', function() { /* Code excerpted. */ });
        //     navigator.mediaSession.setActionHandler('nexttrack', function() { /* Code excerpted. */ });
        //     navigator.mediaSession.setActionHandler('skipad', function() { /* Code excerpted. */ });
        // }

    }

    public getSource() {
        return this.sourceUrl;
    }

    public setSource(url: string) {
        this.sourceUrl = url;
        let source : HTMLSourceElement = this._source.nativeElement;
        source.src = url;
    }

    public play() {
        this._player.nativeElement.load();
        this._player.nativeElement.play();
    }

    public pause() {
        this._player.nativeElement.pause();
    }

    public setLoop(value : boolean) {
        this._player.nativeElement.loop = value;
    }
}