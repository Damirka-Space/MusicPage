import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { Block } from "../content-pages/main/block/block";
import { Card } from "../content-pages/main/block/card/card";
import { Playlist } from "../content-pages/playlist/playlist";
import { Track } from "../content-pages/playlist/table/track";
import { API } from "./api";


export class TestAPI implements API {
    
    setPlayer(player: any): void {
        throw new Error("Method not implemented.");
    }
    
    mainPage(): Observable<Block[]> {
        var blocks : Block[] = [];

        let block = new Block(0, "Добро пожаловать!");
        block.addCard(new Card(0, "Плейлист дня 1", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(1, "Плейлист дня 2", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(2, "Плейлист дня 3", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(3, "Плейлист дня 4", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(4, "Плейлист дня 5", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(5, "Плейлист дня 6", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(6, "Плейлист дня 7", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        blocks.push(block);

        let block2 = new Block(1, "Открытие недели");
        block2.addCard(new Card(7, "Открытие недели", "Лучшее на этой недели", "assets/playlist/PlaylistOfWeek.png"));
        blocks.push(block2);

        let block3 = new Block(2, "Abracadabra3");
        block3.addCard(new Card(8, "Abracadabra3", "Специально для Вас", "assets/playlist/Heart.png"));
        blocks.push(block3);

        return of(blocks);
    }

    getPlaylist(playlistID: number): Observable<Playlist> {
        console.log(playlistID);
        switch(playlistID) {
            case 0:
                return of(new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 1", "Специально для Вас"));
            case 1:
                return of(new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 2", "Специально для Вас"));
            case 2:
                return of(new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 3", "Специально для Вас"));
            case 3:
                return of(new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 4", "Специально для Вас"));
            case 4:
                return of(new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 5", "Специально для Вас"));
            case 5:
                return of(new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 6", "Специально для Вас"));
            case 6:
                return of(new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 7", "Специально для Вас"));
            case 7:
                return of(new Playlist(playlistID, "assets/playlist/PlaylistOfWeek.png", "Открытие недели", "Лучшее на этой неделе"));
            case 8:
                return of(new Playlist(playlistID, "assets/playlist/Heart.png", "Abracadabra3", "Специально для Вас"));
        }
        return of(new Playlist(playlistID, "assets/playlist/Heart.png", "Abracadabra3", "Специально для Вас"));
    }

    getTracks(playlistID: number): Observable<Track[]> {

        var tracks: Track[] = [];

        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        tracks.push(Track.nullTrack());
        
        return of(tracks);
    }

    getUser(): Observable<any> {
        throw new Error("Method not implemented.");
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

    playTrack(track: Track): void {
        throw new Error("Method not implemented.");
    }
    
}