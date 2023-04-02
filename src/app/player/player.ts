import { environment } from "src/environments/environment";
import { PlaylistTableComponent } from "../content-pages/playlist/table/playlist.table.component";
import { Track } from "../content-pages/playlist/table/track";
import { PlayerComponent } from "../player-block/player.component";
import { APIController } from "../server-api/controller";


export abstract class Player {

    private static playerComponent: PlayerComponent;
    private static playlistTableComponent: PlaylistTableComponent;
    private static currentPlaylist: Track[];
    private static playlistId: number;
    private static currentIndex: number;

    public static setPlayerComponent(playerComponent: PlayerComponent) {
        Player.playerComponent = playerComponent;

            navigator.mediaSession.setActionHandler('play', Player.play);
            navigator.mediaSession.setActionHandler('pause', Player.pause);
            navigator.mediaSession.setActionHandler('previoustrack', Player.playPrev);
            navigator.mediaSession.setActionHandler('nexttrack', Player.playNext);

            // navigator.mediaSession.setActionHandler('stop', );
            // navigator.mediaSession.setActionHandler('seekbackward', function() { /* Code excerpted. */ });
            // navigator.mediaSession.setActionHandler('seekforward', function() { /* Code excerpted. */ });
            // navigator.mediaSession.setActionHandler('seekto', function() { /* Code excerpted. */ });
            // navigator.mediaSession.setActionHandler('skipad', function() { /* Code excerpted. */ });
    }

    public static setPlaylistComponent(playlistComponent: PlaylistTableComponent) {
        Player.playlistTableComponent = playlistComponent;
    }

    public static setPlaylist(tracks: Track[], playlistId : number) {
        Player.currentPlaylist = tracks;
        Player.playlistId = playlistId;
    }

    public static loadPlaylistAndPlay(playlistId: number) {
        APIController.getTracks(playlistId).subscribe(data => {
            Player.currentPlaylist = data;
            Player.playlistId = playlistId;
            Player.playTrack(Player.currentPlaylist[0]);
        });
    }

    public static getPlaylist() : Track[] {
        return Player.currentPlaylist;
    }

    public static getPlaylistId() : number {
        return Player.playlistId;
    }

    public static getCurrentIndex() : number {
        return Player.currentIndex;
    }

    public static seek(value: number) {
        Player.playerComponent.seek(value);
    }

    public static update() {
        Player.playerComponent.update();
    }

    public static playTrack(track: Track) {
        if(navigator.mediaSession) {
            let mediaMetadata = new MediaMetadata();
            mediaMetadata.title = track.getTitle();
            mediaMetadata.artist = track.getAuthor().join(", ");
            mediaMetadata.album = track.getAlbum();
            mediaMetadata.artwork = [
                // { sizes: "128x128", src: track.getImageUrl(), type: "image/jpeg"},
                // { sizes: "512x512", src: track.getMetadataImageUrl(), type: 'image/jpeg'},
                { src: track.getMetadataImageUrl() }
            ];

            navigator.mediaSession.metadata = mediaMetadata;   
        }

        Player.currentIndex = track.getIndex() - 1;

        if(Player.currentPlaylist)
            if(Player.playlistTableComponent)
                Player.playlistTableComponent.selectTrack(Player.currentIndex, Player.playlistId);
        

        Player.playerComponent.setSource(track.getUrl());
        Player.playerComponent.setMetadata(track.getTitle(), track.getAuthor().join(", "), track.getMetadataImageUrl());

        APIController.saveToHistoryTrack(track.getId());

        Player.playerComponent.play();
    }

    public static isPlaying() {
        return Player.playerComponent.isPlaying();
    }

    public static play() {
        Player.playerComponent.play();
    }

    public static pause() {
        Player.playerComponent.pause();
    }

    public static playNext() {
        if(++Player.currentIndex > Player.currentPlaylist.length - 1)
            Player.playTrack(Player.currentPlaylist[0]);
        else
            Player.playTrack(Player.currentPlaylist[Player.currentIndex]);
    }

    public static playPrev() {
        if(--Player.currentIndex < 0)
            Player.playTrack(Player.currentPlaylist[Player.currentPlaylist.length - 1]);
        else
            Player.playTrack(Player.currentPlaylist[Player.currentIndex]);
    }
}