import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PageComponent } from "../page.component";

@Component({
    selector: 'collections-page-component',
    templateUrl: 'collections.page.component.html',
    styleUrls: ['collections.page.component.scss']
})
export class CollectionsPageComponent extends PageComponent {

    selectedButton!: string;
    
    constructor(private router :Router) {
        super();
    }

    ngOnInit() {
        this.selectedButton = "playlists";
        // this.router.navigate(['collections/playlists']);
    }

    public selectPlaylists() {
        this.selectedButton = "playlists";
        this.router.navigate(['/collection/playlists']);
    }

    public selectAlbums() {
        this.selectedButton = "albums";
        this.router.navigate(['/collection/albums']);
    }

    public selectAuthors() {
        this.selectedButton = "authors";
        // this.router.navigate(['/collection/authors']);
    }
}