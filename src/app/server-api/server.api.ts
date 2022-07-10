import { Block } from "../content-pages/main/block/block";
import { Playlist } from "../content-pages/playlist/playlist";
import { Track } from "../content-pages/playlist/table/track";

export interface ServerAPI {

    mainPage(): Block[];
    getPlaylist(playlistID: number): Playlist;
    getTracks(playlistID: number): Track[];



    getTrack(trackID: number): any;
    getImage(imageID: number): any;
    getAuthor(authorID: number): any;


}
