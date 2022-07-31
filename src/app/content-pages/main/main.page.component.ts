import { Component, Output } from "@angular/core";
import { APIController } from "src/app/server-api/controller";
import { PageComponent } from "../page.component"
import { Block } from "./block/block";


@Component({
    selector: 'main-page-component',
    templateUrl: 'main.page.component.html',
    styleUrls: ['main.page.component.scss']
})
export class MainPageComponent extends PageComponent {

    @Output() protected blocks: Block[] = [];

    constructor() {
        super();

        APIController.mainPage().subscribe(data => {
            this.blocks = data;
        });
    }

    public getBlocks() {
        return this.blocks;
    }

}