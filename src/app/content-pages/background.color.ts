import { Color, ColorHEX, ColorRGBA } from "./color";

export class LinearGradientBackgroundColorRGBA implements Color {
    private colorOne: ColorRGBA;
    private colorTwo: ColorRGBA;

    public constructor(colorOne: ColorRGBA, colorTwo: ColorRGBA) {
        this.colorOne = colorOne;
        this.colorTwo = colorTwo;
    }

    public toString(): string {
        return "linear-gradient(" + this.colorOne + ',' + this.colorTwo + ',' + this.colorTwo + ',' + this.colorTwo + ")";
    }
}

export class LinearGradientBackgroundColorHEX implements Color {
    private colorOne: ColorHEX;
    private colorTwo: ColorHEX;

    public constructor(colorOne: ColorHEX, colorTwo: ColorHEX) {
        this.colorOne = colorOne;
        this.colorTwo = colorTwo;
    }

    public toString(): string {
        return "linear-gradient(" + this.colorOne + ',' + this.colorTwo + ',' + this.colorTwo + ',' + this.colorTwo + ")";
    }
}

