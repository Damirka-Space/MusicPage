import { Type } from "@angular/core";
import { ContentBlockComponent } from "../content-block/content.block.component";
import { PageComponent } from "./page.component";


export abstract class PageController {
    private static cbp : ContentBlockComponent;
    private static currentPage : Type<PageComponent>;
    private static pageParams : any[];

    public static setContentBlockComponent(cbp : ContentBlockComponent) {
        this.cbp = cbp;
        this.pageParams = [];
    }

    public static setPage(page :  Type<PageComponent>) {
        this.currentPage = page;
        this.cbp.setComponent(page);
    }

    public static addParam(param : any) {
        this.pageParams.push(param);
    }

    public static getParams() : any[] {
        let a = this.pageParams;
        this.pageParams = [];
        return a;
    }

}