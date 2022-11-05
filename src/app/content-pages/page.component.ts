import { ContentBlockComponent } from "../content-block/content.block.component";
import { ColorHEX, ColorRGBA } from "./color";
import { ColorSelector } from "./color.selector";
import { PageController } from "./page.controller";


export class PageComponent{
    protected params!: any[];

    constructor() {
        this.params = PageController.getParams();

        ColorSelector.setBackgroundColor(new ColorHEX("#1f1f1f"));
        ColorSelector.setHeadeColor(ColorHEX.getNullColor());
        ContentBlockComponent.resetScroll();
    }

}
