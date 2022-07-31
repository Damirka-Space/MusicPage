import { Observable } from "rxjs/internal/Observable";

export interface API {

    mainPage(): Observable<any>;
    getPlaylist(playlistID: number): Observable<any>;
    getTracks(playlistID: number): Observable<any>;



    getTrack(trackID: number): any;
    getImage(imageID: number): any;
    getAuthor(authorID: number): any;

    playTrack(trackId: number): void;

    setPlayer(player: any) : void;
}
