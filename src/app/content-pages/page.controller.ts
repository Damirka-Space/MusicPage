import { Type } from "@angular/core";
import { ContentBlockComponent } from "../content-block/content.block.component";
import { PageComponent } from "./page.component";


export abstract class PageController {
    private static cbp : ContentBlockComponent;
    private static currentPage : Type<PageComponent>;

    public static setContentBlockComponent(cbp : ContentBlockComponent) {
        this.cbp = cbp;
    }

    public static setPage(page :  Type<PageComponent>) {
        this.currentPage = page;
        this.cbp.setComponent(page);
    }

}