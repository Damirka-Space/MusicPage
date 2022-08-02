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

    private sourceUrl: string = "";

    constructor() {
    }

    ngAfterViewInit() {
        this._player.nativeElement.addEventListener("ended", Player.playNext);
        Player.setPlayerComponent(this);
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