import { Component } from "@angular/core";
import { PageComponent } from "../page.component";
import { Genre } from "src/app/entities/genre";
import { APIController } from "src/app/server-api/controller";



@Component({
    selector: 'find-page-component',
    templateUrl: 'find.page.component.html',
    styleUrls: ['find.page.component.scss']
})
export class FindPageComponent extends PageComponent {

    protected search : string = ""

    protected genres : Genre[] = []

    constructor() {
        super();

        APIController.getGenres().subscribe(data => {
            this.genres = data;
        });
    }
    

    public isSearching(): boolean {
        return this.search.length > 0
    }

    get Genres() {
        return this.genres;
    }
}