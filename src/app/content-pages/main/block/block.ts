import { Card } from "./card/card";


export class Block {

    private title: string;
    private cards: Card[];

    constructor(title: string) {
        this.title = title;
        this.cards = [];
    }

    public getTitle() {
        return this.title;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getCards() {
        return this.cards;
    }

    public addCard(card: Card) {
        this.cards.push(card);
    }

}