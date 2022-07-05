import { AfterViewInit, Component, Input, Output } from "@angular/core";
import { Block } from "./block";
import { Card } from "./card/card";
import { CardComponent } from "./card/card.component";

@Component({
    selector: 'block-component',
    templateUrl: 'block.component.html',
    styleUrls: ['block.component.scss']
})
export class BlockComponent{

    @Input() block!: Block;
    
    constructor(){
    }

    public getCards(): Card[] {
        return this.block.getCards();
    }

    public getTitle() : string {
        return this.block.getTitle();
    }


}