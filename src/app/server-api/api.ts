import { Observable } from "rxjs/internal/Observable";

export interface API {

    mainPage(): Observable<any>;

    channelPage(): Observable<any>;

    collectionAlbumsPage(): Observable<any>;
    collectionPlaylistsPage(): Observable<any>;
    collectionAuthorsPage(): Observable<any>;

    likeTrack(trackID: number): void;
    likeAlbum(albumID: number): void;

    getChat(channelID: number): Observable<any>;

    saveToHistoryTrack(trackID: number): void;

    saveAlbumToHistoryTrack(albumID: number): void;

    getPlaylist(playlistID: number): Observable<any>;
    getTracks(playlistID: number): Observable<any>;

    getUser(): Observable<any>;

    getTrack(trackID: number): any;
    getImage(imageID: number): any;
    getAuthor(authorID: number): any;
}
