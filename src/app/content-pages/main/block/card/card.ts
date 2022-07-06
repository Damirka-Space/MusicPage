

export class Card {
    private id: number;
    private title: string;
    private description: string;
    private imageUrl: string;

    public constructor(id: number, title: string, description: string, imageUrl: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public static nullCard() : Card {
        return new Card(0, "Плейлист дня", "описание", "assets/playlist/Heart.png");
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

    public getId() {
        return this.id;
    }
}