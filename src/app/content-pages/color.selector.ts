import { ContentBlockComponent } from "../content-block/content.block.component";
import { Color } from "./color";

export abstract class ColorSelector {

    public static setBackgroundColor(color: Color) {
        ContentBlockComponent.setBackgroundColor(color);
    }

    public static setHeadeColor(color: Color) {
        ContentBlockComponent.setHeaderColor(color);
    }
}

