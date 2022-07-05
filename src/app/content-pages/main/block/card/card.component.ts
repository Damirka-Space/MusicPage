import { Component, Input } from "@angular/core";
import { Card } from "./card";


@Component({
    selector: 'card-component',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss']
})
export class CardComponent {
    @Input() card!: Card;

    constructor() {
    }

}