import { environment } from "src/environments/environment";
import { PlaylistTableComponent } from "../content-pages/playlist/table/playlist.table.component";
import { Track } from "../content-pages/playlist/table/track";
import { PlayerComponent } from "../player-block/player.component";


export abstract class Player {

    private static playerComponent: PlayerComponent;
    private static playlistTableComponent: PlaylistTableComponent;
    private static currentPlaylist: Track[];
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

    public static setPlaylist(tracks: Track[]) {
        Player.currentPlaylist = tracks;
    }


    public static playTrack(track: Track) {
        
        if(navigator.mediaSession) {
            let mediaMetadata = new MediaMetadata();
            mediaMetadata.title = track.getTitle();
            mediaMetadata.artist = track.getAuthor().join(", ");
            mediaMetadata.album = track.getAlbum();
            mediaMetadata.artwork = [{ src: track.getImageUrl() }];

            navigator.mediaSession.metadata = mediaMetadata;   
        }

        Player.currentIndex = track.getIndex() - 1;

        if(Player.currentPlaylist)
            Player.playlistTableComponent.selectTrack(track, Player.currentPlaylist);
        

        Player.playerComponent.setSource(environment.api_root + environment.api_track_get + track.getId());

        Player.playerComponent.play();
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