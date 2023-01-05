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

    protected isPlaying = false;

    // values for slider
    protected max = 0;
    protected value = 0;

    protected sliderIsClicked = false;

    // values for sound slider
    protected volume : number | any = 0.25;

    private title!: string;
    private artist!: string;
    private imageUrl!: string;

    public update() {
        if(this.isPlaying && !this.sliderIsClicked) {
            this.value = this._player.nativeElement.currentTime;
            this.max = this._player.nativeElement.duration;
        }
    }

    sliderOnChange(event: any) {
        Player.seek(event.value);
        this.sliderIsClicked = false;
    }

    sliderOnClick(event: any) {
        this.sliderIsClicked = true;
    }

    ngAfterViewInit() {
        this._player.nativeElement.addEventListener("ended", Player.playNext);
        this._player.nativeElement.addEventListener("timeupdate", Player.update);
        Player.setPlayerComponent(this);
        this.setVolume(this.volume);
    }

    public getSource() {
        return this.sourceUrl;
    }

    public seek(value: number) {
        this._player.nativeElement.currentTime = value;
    }

    public volumeOnChange(event: any) {
        this.setVolume(event.value)
    }

    public setVolume(value: number) {
        this.volume = value;
        this._player.nativeElement.volume = this.volume;
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

    public setMetadata(title: string, artist: string, imageUrl: string) {
        this.title = title;
        this.artist = artist;
        this.imageUrl = imageUrl;
    }

    protected getTitle() {
        return this.title;
    }

    protected getArtist() {
        return this.artist;
    }

    protected getImageUrl() {
        return this.imageUrl;
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
        this.isPlaying = true;
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