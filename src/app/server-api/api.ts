import { Observable } from "rxjs/internal/Observable";
import { Block } from "../content-pages/main/block/block";
import { Playlist } from "../content-pages/playlist/playlist";
import { Track } from "../content-pages/playlist/table/track";

export interface API {

    mainPage(): Observable<any>;
    getPlaylist(playlistID: number): Observable<any>;
    getTracks(playlistID: number): Observable<any>;



    getTrack(trackID: number): any;
    getImage(imageID: number): any;
    getAuthor(authorID: number): any;

    playTrack(trackId: number): void;
}
