export interface Color {

    toString(): string;
}

export class ColorRGBA implements Color {
    private r!: number;
    private g!: number;
    private b!: number;
    private a!: number;


    public constructor(r: number, g: number, b: number, a:number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public toString(): string {
        return "rgba(" + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ")";
    }
}

export class ColorHEX implements Color {
    private hex: string;

    public constructor(hex: string) {
        this.hex = hex; 
    }

    public toString(): string {
        return this.hex;
    }
}


