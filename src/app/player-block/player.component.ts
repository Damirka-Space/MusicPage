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

    // values for slider
    max = 0;
    value = 0;

    private sliderClicked = false;

    @ViewChild('source', {read: ElementRef})
    _source!: ElementRef;

    private sourceUrl: string = "";

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
        console.log(this._player.nativeElement.seeking)
        if(this._player.nativeElement.seeking) {
            console.log(this.value);
            Player.seek(this.value);
        }
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
        }
    }

    protected onPlayPrevClick() {
        Player.playPrev();
    }

    protected onPlayNextClick() {
        Player.playNext();
    }

    protected onPlayClick() {
        if(!this._player.nativeElement.paused) 
            this.pause();
        else
            this.play();
    }

    public play() {
        this._player.nativeElement.play();
    }

    public pause() {
        this._player.nativeElement.pause();
    }

    public setLoop(value : boolean) {
        this._player.nativeElement.loop = value;
    }
}