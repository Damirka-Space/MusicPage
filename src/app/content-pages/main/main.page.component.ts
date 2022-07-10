import { Component, Output } from "@angular/core";
import { APIController } from "src/app/server-api/controller";
import { PageComponent } from "../page.component"
import { Block } from "./block/block";
import { Card } from "./block/card/card";


@Component({
    selector: 'main-page-component',
    templateUrl: 'main.page.component.html',
    styleUrls: ['main.page.component.scss']
})
export class MainPageComponent extends PageComponent {

    @Output() protected blocks: Block[];

    constructor() {
        super();

        this.blocks = APIController.mainPage();;
    }

    public getBlocks() {
        return this.blocks;
    }



}