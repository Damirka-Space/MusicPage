import { HttpClient } from "@angular/common/http";
import { map, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { API } from "./api";

import { Block } from "../content-pages/main/block/block";
import { Card } from "../content-pages/main/block/card/card"
import { Playlist } from "../content-pages/playlist/playlist";
import { Track } from "../content-pages/playlist/table/track";
import { environment } from "src/environments/environment";

interface ITrack {
    id: number;
    title: string;
    authorId: number[];
    author: string[];
    albumId: number;
    album: string;
}

interface IImage {
    id: number;
    url: string;
}

interface IAlbum {
    id: number;
    title: string;
    description: string;
    image: IImage;
}

interface IBlock {
    id: number;
    title: string;
    albums: IAlbum[];

}

interface blockData {
    blocks : IBlock[]
}

const imageUrl = environment.api_image_get
const albumImageUrl = environment.api_album_image_get
const albumTrackImageUrl = environment.api_album_track_image_get
const albumTrackMetadataUrl = environment.api_album_track_metadata_image_get;

abstract class BlockFactory {

    public static fromResponse(response : any) : Block[] {

        let obj = response as blockData;

        let blocks : Block[] = [];

        obj.blocks.forEach(blc => {
            let block = new Block(blc.id, blc.title);

            blc.albums.forEach(alb => {
                let card = new Card(alb.id, alb.title, alb.description, imageUrl + alb.image.id.toString());
                block.addCard(card);
            })

            blocks.push(block);
        })


        return blocks;
    }
}

interface playlistData {
    id: number;

    title: string;
    description: string;

    image: IImage;

    // authors;
}

abstract class PlaylistFactory {
    public static fromResponse(response : any) : Playlist {
        let obj = response as playlistData;

        let playlist : Playlist = new Playlist(obj.id, imageUrl + obj.image.id.toString(), obj.title, obj.description);

        return playlist;
    }
}


abstract class TracksFactory {
    public static formResponse(response : any) : Track[] {
        let obj = response as ITrack[];

        let tracks : Track[] = [];

        let index = 1;

        obj.forEach(t => {
            let track = new Track(index++, t.id, t.authorId, t.albumId, t.albumId, t.title, t.author, t.album, albumTrackImageUrl + t.albumId, albumTrackMetadataUrl + t.albumId, "");
            tracks.push(track);
        })

        return tracks;
    }
}


export class ServerAPI implements API {

    private http: HttpClient;

    private url : string = environment.api_root;

    constructor(http: HttpClient) {
        this.http = http;
    }

    mainPage(): Observable<any> {
        return this.http.get(this.url + environment.api_main).pipe(map((val) => {
            return BlockFactory.fromResponse(val);
        }));
    }
    getPlaylist(playlistID: number): Observable<any> {
        return this.http.get(this.url + environment.api_album_get + playlistID).pipe(map((val) => {
            return PlaylistFactory.fromResponse(val);
        }));
    }
    getTracks(playlistID: number): Observable<any> {
        return this.http.get(this.url + environment.api_tracks_get + playlistID).pipe(map((val) => {
            return TracksFactory.formResponse(val);
        }));
    }
    getTrack(trackID: number) {
        throw new Error("Method not implemented.");
    }
    getImage(imageID: number) {
        throw new Error("Method not implemented.");
    }
    getAuthor(authorID: number) {
        throw new Error("Method not implemented.");
    }

}
