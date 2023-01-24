import { Observable } from "rxjs/internal/Observable";
import { Track } from "../content-pages/playlist/table/track";

export interface API {

    mainPage(): Observable<any>;
    getPlaylist(playlistID: number): Observable<any>;
    getTracks(playlistID: number): Observable<any>;

    getUser(): Observable<any>;

    logout(): Observable<any>;

    getTrack(trackID: number): any;
    getImage(imageID: number): any;
    getAuthor(authorID: number): any;
}
