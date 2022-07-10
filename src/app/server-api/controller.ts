import { Block } from "../content-pages/main/block/block";
import { Playlist } from "../content-pages/playlist/playlist";
import { Track } from "../content-pages/playlist/table/track";
import { ServerAPI } from "./server.api";


export abstract class APIController {
    private static api: ServerAPI;

    public static setAPI(api: ServerAPI) {
        this.api = api;
    }

    public static mainPage(): Block[] {
        return this.api.mainPage();
    }

    public static getPlaylist(playlistID: number): Playlist {
        return this.api.getPlaylist(playlistID);
    }

    public static getTracks(playlistID: number): Track[] {
        return this.api.getTracks(playlistID);
    }
}