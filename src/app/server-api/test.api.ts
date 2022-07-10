import { Block } from "../content-pages/main/block/block";
import { Card } from "../content-pages/main/block/card/card";
import { Playlist } from "../content-pages/playlist/playlist";
import { Track } from "../content-pages/playlist/table/track";
import { ServerAPI } from "./server.api";


export class TestAPI implements ServerAPI {
    
    mainPage(): Block[] {
        var blocks : Block[] = [];

        let block = new Block("Добро пожаловать!");
        block.addCard(new Card(0, "Плейлист дня 1", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(1, "Плейлист дня 2", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(2, "Плейлист дня 3", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(3, "Плейлист дня 4", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(4, "Плейлист дня 5", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(5, "Плейлист дня 6", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        block.addCard(new Card(6, "Плейлист дня 7", "Специально для Вас", "assets/playlist/PlaylistOfDay1.png"));
        blocks.push(block);

        let block2 = new Block("Открытие недели");
        block2.addCard(new Card(7, "Открытие недели", "Лучшее на этой недели", "assets/playlist/PlaylistOfWeek.png"));
        blocks.push(block2);

        let block3 = new Block("Abracadabra3");
        block3.addCard(new Card(8, "Abracadabra3", "Специально для Вас", "assets/playlist/Heart.png"));
        blocks.push(block3);

        return blocks;
    }

    getPlaylist(playlistID: number): Playlist {
        console.log(playlistID);
        switch(playlistID) {
            case 0:
                return new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 1", "Специально для Вас");
            case 1:
                return new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 2", "Специально для Вас");
            case 2:
                return new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 3", "Специально для Вас");
            case 3:
                return new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 4", "Специально для Вас");
            case 4:
                return new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 5", "Специально для Вас");
            case 5:
                return new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 6", "Специально для Вас");
            case 6:
                return new Playlist(playlistID, "assets/playlist/PlaylistOfDay1.png", "Плейлист дня 7", "Специально для Вас");
            case 7:
                return new Playlist(playlistID, "assets/playlist/PlaylistOfWeek.png", "Открытие недели", "Лучшее на этой неделе");
            case 8:
                return new Playlist(playlistID, "assets/playlist/Heart.png", "Abracadabra3", "Специально для Вас");
        }
        return new Playlist(playlistID, "assets/playlist/Heart.png", "Abracadabra3", "Специально для Вас");
    }

    getTracks(playlistID: number): Track[] {

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
        
        return tracks;
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