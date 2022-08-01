

export class Track {

    private index!: number;
    private id!: number;
    private authorId!: number[];
    private albumId!: number;
    private imageId!: number;

    private title: string;
    private author: string[];
    private album: string;
    private imageUrl: string
    private time: string;

    constructor(index: number, id: number, authorId: number[], albumId: number, imageId: number,
                title: string, author: string[], album: string, imageUrl: string, time: string) {
        this.index = index;
        this.id = id;
        this.authorId = authorId;
        this.albumId = albumId;
        this.imageId = imageId;
        this.title = title;
        this.author = author;
        this.album = album;
        this.imageUrl = imageUrl;
        this.time = time;
    }

    private static ID : number = 1;
    public static nullTrack() {
        return new Track(this.ID++, 0, [0], 0, 0, "Test112321312", ["Red hot chilli pepers"], "test3", "assets/playlist/Heart.png", "0:0");
    }


    public getTitle(): string {
        return this.title;
    }

    public getAuthor(): string[] {
        return this.author;
    }

    public getAlbum(): string {
        return this.album;
    }

    public getImageUrl(): string {
        return this.imageUrl;
    }

    public getTime(): string {
        return this.time;
    }

    public getIndex(): number {
        return this.index;
    }

    public getId(): number {
        return this.id;
    }

    public getAuthorId(): number[] {
        return this.authorId;
    }

    public getAlbumId(): number {
        return this.albumId;
    }

    public getImageId(): number {
        return this.imageId;
    }
    

}