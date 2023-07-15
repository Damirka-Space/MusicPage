import { Component, ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { PlayerService } from "../services/player.service";

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

    protected playing = false;
    protected showed = false;
    protected loop = false;

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
        if(this.playing && !this.sliderIsClicked) {
            this.value = this._player.nativeElement.currentTime;
            this.max = this._player.nativeElement.duration;
        }
    }

    sliderOnChange(event: any) {
        this.playerService.seek(event.value);
        this.sliderIsClicked = false;
    }

    sliderOnClick(event: any) {
        this.sliderIsClicked = true;
    }

    constructor(private playerService : PlayerService) {

    }

    ngAfterViewInit() {
        this.playerService.setPlayerComponent(this);
        this._player.nativeElement.addEventListener("ended", () => {
            this.playerService.playNext();
        });

        this._player.nativeElement.addEventListener("timeupdate", () => {
            this.playerService.update();
        });
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
            this.playing = true;
            this.showed = true;
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
        this.playerService.playPrev();
    }

    protected onPlayNextClick() {
        this.playerService.playNext();
    }

    protected onPlayClick() {
        if(this.playing)
            this.pause();
        else
            this.play();
    }

    protected onShuffleClick() {
        
    }

    protected onRepeatClick() {
        if(this.playing) {
            if(!this._player.nativeElement.loop) {
                this.loop = true;
                this.setLoop(this.loop);
            }
            else {
                this.loop = false
                this.setLoop(this.loop);
            }
        }
    }

    public isPlaying() {
        return this.playing;
    }

    public play() {
        this._player.nativeElement.play();
        this.playing = true;
    }

    public pause() {
        this._player.nativeElement.pause();
        this.playing = false;
    }

    public stop() {
        this.pause();
        this._player.nativeElement.stop();
        this.playing = false;
    }

    public setLoop(value : boolean) {
        this._player.nativeElement.loop = value;
    }
}