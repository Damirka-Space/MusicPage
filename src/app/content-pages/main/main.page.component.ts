import { Component, Output } from "@angular/core";
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

        this.blocks = [];
        let block = new Block("Abracadabra");
        block.addCard(Card.nullCard());
        block.addCard(Card.nullCard());
        block.addCard(Card.nullCard());
        block.addCard(Card.nullCard());
        this.blocks.push(block);

        let block2 = new Block("Abracadabra2");
        block2.addCard(Card.nullCard());
        this.blocks.push(block2);

        let block3 = new Block("Abracadabra3");
        block3.addCard(Card.nullCard());
        this.blocks.push(block3);
        
    }

    public getBlocks() {
        return this.blocks;
    }



}