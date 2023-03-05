import { Observable } from "rxjs/internal/Observable";

export interface API {

    isAuthorized: boolean;

    mainPage(): Observable<any>;

    collectionAlbumsPage(): Observable<any>;
    collectionPlaylistsPage(): Observable<any>;
    collectionAuthorsPage(): Observable<any>;

    likeTrack(trackID: number): void;
    likeAlbum(albumID: number): void;

    saveToHistoryTrack(trackID: number): void;

    getPlaylist(playlistID: number): Observable<any>;
    getTracks(playlistID: number): Observable<any>;

    getUser(): Observable<any>;

    logout(): Observable<any>;

    getTrack(trackID: number): any;
    getImage(imageID: number): any;
    getAuthor(authorID: number): any;
}
