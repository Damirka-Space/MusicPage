import { Card } from "./card/card";


export class Block {
    private id : number;
    private title: string;
    private cards: Card[];

    constructor(id: number, title: string) {
        this.id = id;
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