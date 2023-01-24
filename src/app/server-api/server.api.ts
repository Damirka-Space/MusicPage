import { HttpClient } from "@angular/common/http";
import { map, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { API } from "./api";

import { Block } from "../content-pages/main/block/block";
import { Card } from "../content-pages/main/block/card/card"
import { Playlist } from "../content-pages/playlist/playlist";
import { Track } from "../content-pages/playlist/table/track";
import { environment } from "src/environments/environment";
import { User } from "../content-block/user/user";

interface ITrack {
    id: number;
    title: string;
    authorId: number[];
    author: string[];
    albumId: number;
    album: string;
    url: string;
    imageUrl: string;
    metadataImageUrl: string;
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

interface IUser {
    id: number;
    username: string;
    email: string;
    gender: string;
}

abstract class BlockFactory {

    public static fromResponse(response : any) : Block[] {

        let obj = response as blockData;

        let blocks : Block[] = [];

        obj.blocks.forEach(blc => {
            let block = new Block(blc.id, blc.title);

            blc.albums.forEach(alb => {
                let card = new Card(alb.id, alb.title, alb.description, alb.image.url);
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

    imageUrl: string;
}

abstract class PlaylistFactory {
    public static fromResponse(response : any) : Playlist {
        let obj = response as playlistData;

        let playlist : Playlist = new Playlist(obj.id, obj.imageUrl, obj.title, obj.description);
        // console.log(playlist);

        return playlist;
    }
}


abstract class TracksFactory {
    public static formResponse(response : any) : Track[] {
        let obj = response as ITrack[];

        let tracks : Track[] = [];

        let index = 1;

        obj.forEach(t => {
            let track = new Track(t.url, index++, t.id, t.authorId, t.albumId, t.albumId, t.title, t.author, t.album, t.imageUrl, t.metadataImageUrl, "");
            // console.log(track);
            tracks.push(track);
        })

        return tracks;
    }
}

abstract class UserFactory {
    public static fromResponse(response: any) : User {
        let obj = response as IUser;

        let user = new User(obj.id, obj.username, obj.email, obj.gender);

        return user;
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
    getUser(): Observable<any> {
        return this.http.get(environment.api_user_get, { withCredentials: true }).pipe(map((val) => {
            return UserFactory.fromResponse(val);
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
