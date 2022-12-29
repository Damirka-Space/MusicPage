import { Component, ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { Player } from "../player/player";

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

    @ViewChild('PlayButton', {read: ElementRef})
    _playButton!: ElementRef;

    @ViewChild('RepeatButton', {read: ElementRef})
    _repeatButton!: ElementRef;

    private sourceUrl: string = "";

    // values for slider
    protected max = 0;
    protected value = 0;

    protected isPlaying = false;

    private sliderClicked = false;

    constructor() {
    }

    public update() {
        if(!this.sliderClicked) {
            this.value = this._player.nativeElement.currentTime;
            this.max = this._player.nativeElement.duration;
        }
    }

    sliderOnClick() {
        this.sliderClicked = true;
    }

    sliderOnRelease() {
        Player.seek(this.value);
        this.sliderClicked = false;
    }

    ngAfterViewInit() {
        this._player.nativeElement.addEventListener("ended", Player.playNext);
        this._player.nativeElement.addEventListener("timeupdate", Player.update);
        Player.setPlayerComponent(this);
    }

    public getSource() {
        return this.sourceUrl;
    }

    public seek(value: number) {
        this._player.nativeElement.currentTime = value;
    }

    public setSource(url: string) {
        if(this.sourceUrl != url) {
            this.sourceUrl = url;
            let source : HTMLSourceElement = this._source.nativeElement;
            source.src = url;
            this._player.nativeElement.load();
            this.isPlaying = true;
        }
    }

    protected onPlayPrevClick() {
        Player.playPrev();
    }

    protected onPlayNextClick() {
        Player.playNext();
    }

    protected onPlayClick() {
        if(this.isPlaying) {
            if(!this._player.nativeElement.paused) 
                this.pause();
            else
                this.play();
        }
    }

    protected onShuffleClick() {
        
    }

    protected onRepeatClick() {
        if(this.isPlaying) {
            if(!this._player.nativeElement.loop) {
                this.setLoop(true);
                this._repeatButton.nativeElement.src = "assets/playlist/RepeatButtonSingle.png";
            }
            else {
                this.setLoop(false);
                this._repeatButton.nativeElement.src = "assets/playlist/RepeatButton.png";
            }
        }
    }

    public play() {
        this._player.nativeElement.play();
        this._playButton.nativeElement.src = "assets/playlist/PauseButton.png";
    }

    public pause() {
        this._player.nativeElement.pause();
        this._playButton.nativeElement.src = "assets/playlist/PlayButton.png";
    }

    public stop() {
        this.pause();
        this._player.nativeElement.stop();
        this.isPlaying = false;
    }

    public setLoop(value : boolean) {
        this._player.nativeElement.loop = value;
    }
}