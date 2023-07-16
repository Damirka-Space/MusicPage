import { Component, ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { PlayerService } from "../services/player.service";

@Component({
    selector: 'player-component',
    templateUrl: 'player.component.html',
    styleUrls: ['player.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlayerComponent {

    @ViewChild('PlayButton', {read: ElementRef})
    _playButton!: ElementRef;

    @ViewChild('RepeatButton', {read: ElementRef})
    _repeatButton!: ElementRef;

    // protected playing = false;
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
        if(this.isPlaying && !this.sliderIsClicked) {
            this.value = this.playerService.getPos;
            this.max = this.playerService.getDuration;
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
        
        setInterval(() => {
            this.update();
        }, 1)

        this.setVolume(this.volume);
    }


    public volumeOnChange(event: any) {
        this.setVolume(event.value)
    }

    public setVolume(value: number) {
        this.volume = value;
        this.playerService.setVolume = value;
    }


    public setMetadata(title: string, artist: string, imageUrl: string) {
        this.title = title;
        this.artist = artist;
        this.imageUrl = imageUrl;
        this.showed = true;
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
        if(this.isPlaying)
            this.pause();
        else
            this.play();
    }

    protected onShuffleClick() {
        
    }

    protected onRepeatClick() {
        if(this.isPlaying) {
            if(!this.playerService.isRepeate) {
                this.setLoop(!this.playerService.isRepeate);
            }
            else {
                this.setLoop(!this.playerService.isRepeate);
            }
        }
    }

    public get isPlaying() {
        return this.playerService.isPlaying;
    }

    public play() {
        this.playerService.play();
    }

    public pause() {
        this.playerService.pause();
    }

    public stop() {
        this.pause();
        // this.playerService.stop();
    }

    public setLoop(value : boolean) {
        this.loop = value;
        this.playerService.setRepeat = value;
    }
}