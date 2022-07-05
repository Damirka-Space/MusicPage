

export class Card {
    private title: string;
    private description: string;
    private imageUrl: string;

    public constructor(title: string, description: string, imageUrl: string) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public static nullCard() : Card {
        return new Card("undefinedCardTitle", "null", "assets/playlist/Heart.png");
    }

    public getTitle() {
        return this.title;
    }

    public getDescription() {
        return this.description;
    }

    public getImageUrl() {
        return this.imageUrl;
    }
}