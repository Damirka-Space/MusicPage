import { Component, Output } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ContentBlockComponent } from "src/app/content-block/content.block.component";
import { APIController } from "src/app/server-api/controller";
import { Block } from "../../main/block/block";
import { PageComponent } from "../../page.component";



@Component({
    selector: 'playlists-collections-page-component',
    templateUrl: 'playlists.collections.page.component.html',
    styleUrls: ['playlists.collections.page.component.scss']
})
export class PlaylistsCollectionsComponent extends PageComponent {
    
    @Output() protected blocks: Block[] = [];

    private downloaded = false;

    constructor(private titleService:Title, private metaService: Meta) {
        super();

        APIController.collectionPlaylistsPage().subscribe(data => {
            this.blocks = data;
            this.downloaded = true;
        });
        
        ContentBlockComponent.resetScroll();
    }

    ngOnInit() {
        this.titleService.setTitle("Коллекции");
        this.metaService.updateTag( { property:"og:title",content:"Коллекции"});
        this.metaService.updateTag( { property:"og:type",content:"website"});
        //this.metaService.updateTag( { property:"og:url",content:window.location.href});
        this.metaService.updateTag( { name:"description",content:"Коллекции"});
        this.metaService.updateTag( { property:"og:description",content:"Коллекции"});
        this.metaService.updateTag( { name: "theme-color", content:"#121212" });
        
    }

    public getBlocks() {
        return this.blocks;
    }

    public get isDownloaded() {
        return this.downloaded;
    }
}