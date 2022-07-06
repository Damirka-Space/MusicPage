import { Type } from "@angular/core";
import { CollectionsPageComponent } from "./collections/collections.page.component";
import { FindPageComponent } from "./find/find.page.component";
import { MainPageComponent } from "./main/main.page.component";
import { PageComponent } from "./page.component";
import { PageController } from "./page.controller";
import { PlaylistPageComponent } from "./playlist/playlist.page.component";
import { StreamPageComponent } from "./stream/stream.page.component";


export abstract class PageSelector {
    private static currentPage : Type<PageComponent>;

    public static selectMainPage() {
        if(this.currentPage == MainPageComponent)
            return;
        this.currentPage = MainPageComponent;
        PageController.setPage(MainPageComponent);
    }

    public static selectCollectionsPage() {
        if(this.currentPage == CollectionsPageComponent)
            return;
        this.currentPage = CollectionsPageComponent;
        PageController.setPage(CollectionsPageComponent);
    }

    public static selectFindPage() {
        if(this.currentPage == FindPageComponent)
            return;
        this.currentPage = FindPageComponent;
        PageController.setPage(FindPageComponent);
    }

    public static selectStreamPage() {
        if(this.currentPage == StreamPageComponent)
            return;
        this.currentPage = StreamPageComponent;
        PageController.setPage(StreamPageComponent);
    }

    public static selectPlaylistPage() {
        if(this.currentPage == PlaylistPageComponent)
            return;
        this.currentPage = PlaylistPageComponent;
        PageController.setPage(PlaylistPageComponent);
    }

}