import { Observable } from "rxjs/internal/Observable";
import { User } from "../content-block/user/user";
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