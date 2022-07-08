export interface Color {

    setAlpha(a : number): void;
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
    setAlpha(a: number): void {
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

    setAlpha(a: number): void {
        var hexA = a.toString(16);
        if(hexA.includes('.'))
            hexA = hexA.substring(0, hexA.indexOf('.'));

        if(hexA.length == 1)
            hexA = '0' + hexA;
        
        if(this.hex.length == 6) 
            this.hex += hexA;
        else
            this.hex = this.hex.substring(0, 7) + hexA;
    }

    public toString(): string {
        return this.hex;
    }

    public static getNullColor() {
        return new ColorHEX("#00000000");
    }
}


