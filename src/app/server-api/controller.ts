import { Observable } from "rxjs/internal/Observable";
import { User } from "../entities/user";
import { Block } from "../content-pages/main/block/block";
import { Playlist } from "../content-pages/playlist/playlist";
import { Track } from "../content-pages/playlist/table/track";
import { API } from "./api";


export abstract class APIController {
    private static api: API;

    public static setAPI(api: API) {
        this.api = api;
    }

    public static mainPage(): Observable<any[]> {
        return this.api.mainPage();
    }

    public static channelPage(): Observable<any[]> {
        return this.api.channelPage();
    }

    public static getChat(channelId: number): Observable<any> {
        return this.api.getChat(channelId);
    }

    public static collectionAlbumsPage(): Observable<any[]> {
        return this.api.collectionAlbumsPage();
    }

    public static collectionPlaylistsPage(): Observable<any[]> {
        return this.api.collectionPlaylistsPage();
    }

    public static collectionAuthorsPage(): Observable<any[]> {
        return this.api.collectionAuthorsPage();
    }

    public static likeTrack(trackID: number): void{
        return this.api.likeTrack(trackID);
    }

    public static likeAlbum(albumId: number): void{
        return this.api.likeAlbum(albumId);
    }

    public static saveToHistoryTrack(trackID: number): void{
        return this.api.saveToHistoryTrack(trackID);
    }

    public static saveAlbumToHistoryTrack(albumID: number): void{
        return this.api.saveAlbumToHistoryTrack(albumID);
    }

    public static getPlaylist(playlistID: number): Observable<Playlist> {
        return this.api.getPlaylist(playlistID);
    }

    public static getTracks(playlistID: number): Observable<Track[]> {
        return this.api.getTracks(playlistID);
    }

    public static getUser() : Observable<User> {
        return this.api.getUser();
    }
}