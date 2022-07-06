

export class Playlist {
    private id: number;
    private imageUrl: string;
    private title: string;
    private description: string;

    // private type : Type; // type of playlist (singl, album, playlist)
    // private author : Author; // author of playlist

    constructor(id: number, imageUrl: string, title: string, description: string) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
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

}