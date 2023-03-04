

export class Playlist {
    private id: number;
    private imageUrl: string;
    private title: string;
    private description: string;
    private type: string;
    private liked: boolean;

    // private type : Type; // type of playlist (singl, album, playlist)
    // private author : Author; // author of playlist

    constructor(id: number, imageUrl: string, title: string, description: string, type: string, liked: boolean) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
        this.type = type;
        this.liked = liked;
    }

    public getId() {
        return this.id; 
    }

    public getImageUrl() {
        return this.imageUrl;
    }

    public getTitle() {
        return this.title;
    }

    public getDescription() {
        return this.description;
    }

    public getType() {
        return this.type;
    }

    public isLiked() {
        return this.liked;
    }

    public setLike(value: boolean) {
        this.liked = value;
    }

}