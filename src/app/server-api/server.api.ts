import { HttpClient } from "@angular/common/http";
import { map, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { API } from "./api";

import { Block } from "../content-pages/main/block/block";
import { Card } from "../content-pages/main/block/card/card"
import { Playlist } from "../content-pages/playlist/playlist";
import { Track } from "../content-pages/playlist/table/track";
import { environment } from "src/environments/environment";
import { User } from "../entities/user";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { Channel } from "../entities/channel";

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
    liked: boolean;
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
    albumType: string;
    liked: boolean;
}

abstract class PlaylistFactory {
    public static fromResponse(response : any) : Playlist {
        let obj = response as playlistData;

        let playlist : Playlist = new Playlist(obj.id, obj.imageUrl, obj.title, obj.description, obj.albumType, obj.liked);
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
            let track = new Track(t.url, index++, t.id, t.authorId, t.albumId, t.albumId, t.title, t.author, t.album, t.imageUrl, t.metadataImageUrl, "", t.liked);
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

abstract class ChannelFactory {
    public static fromResponse(response: any): Channel[] {
        let res = response as Channel[];

        return res;
    }
}

@Injectable({
    providedIn: 'root'
})
export class ServerAPI implements API {

    private http: HttpClient;

    private url : string = environment.api_root;

    constructor(http: HttpClient, private authService : AuthService) {
        this.http = http;
    }

    saveToHistoryTrack(trackID: number): void {
        this.http.get(this.url + environment.api_history_save_track + trackID, { 
                headers : this.authService.getHeaders,
                reportProgress: false
    }).subscribe({
        next: (value: Object) => {},
        error: (err : any) => {}
    });
    }

    saveAlbumToHistoryTrack(albumID: number): void {
        this.http.get(this.url + environment.api_history_save_album + albumID, { 
                headers : this.authService.getHeaders,
                reportProgress: false
    }).subscribe({
        next: (value: Object) => {},
        error: (err : any) => {}
    });
    }

    likeAlbum(albumID: number): void {
        this.http.get(this.url + environment.api_like_album + albumID, { 
                headers : this.authService.getHeaders
    }).subscribe({
        next: (value: Object) => {},
        error: (err : any) => {}
    });
    }

    likeTrack(trackID: number) {
        this.http.get(this.url + environment.api_like_track + trackID, { 
                headers : this.authService.getHeaders
    }).subscribe({
        next: (value: Object) => {},
        error: (err : any) => {}
    });
    }

    collectionAlbumsPage(): Observable<any> {
        return this.http.get(this.url + environment.api_collection_albums, { 
            headers : this.authService.getHeaders
    }).pipe(map((val) => {
            return BlockFactory.fromResponse(val);
        }));
    }

    collectionPlaylistsPage(): Observable<any> {
        return this.http.get(this.url + environment.api_collection_playlists, { 
                headers : this.authService.getHeaders  
    }).pipe(map((val) => {
            return BlockFactory.fromResponse(val);
        }));
    }

    collectionAuthorsPage(): Observable<any> {
        return this.http.get(this.url + environment.api_collection_authors, { 
                headers : this.authService.getHeaders
    }).pipe(map((val) => {
            return BlockFactory.fromResponse(val);
        }));
    }

    mainPage(): Observable<any> {
        return this.http.get(this.url + environment.api_main, { 
            withCredentials : this.authService.isAuthorized, 
            headers : this.authService.getHeaders
        }).pipe(map((val) => {
            return BlockFactory.fromResponse(val);
        }));
    }

    channelPage(): Observable<any> {
        return this.http.get(this.url + environment.api_channel_list, { 
            withCredentials : this.authService.isAuthorized, 
            headers : this.authService.getHeaders
        }).pipe(map((val) => {
            return ChannelFactory.fromResponse(val);
        }));
    }

    getPlaylist(playlistID: number): Observable<any> {
        return this.http.get(this.url + environment.api_album_get + playlistID, { 
                withCredentials : this.authService.isAuthorized, 
                headers : this.authService.getHeaders  
    }).pipe(map((val) => {
            return PlaylistFactory.fromResponse(val);
        }));
    }
    getTracks(playlistID: number): Observable<any> {
        return this.http.get(this.url + environment.api_tracks_get + playlistID, { 
                withCredentials : this.authService.isAuthorized, 
                headers : this.authService.getHeaders 
    }).pipe(map((val) => {
            return TracksFactory.formResponse(val);
        }));
    }

    public getUser(): Observable<any> {
        return this.http.get(environment.api_user_get, { 
            headers : this.authService.getHeaders 
        }).pipe(map((val) => {
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
function Injctable(target: typeof ServerAPI): void | typeof ServerAPI {
    throw new Error("Function not implemented.");
}

