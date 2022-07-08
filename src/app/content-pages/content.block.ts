import { ContentBlockComponent } from "../content-block/content.block.component";


export abstract class ContentBlock {

    public static getScrollByPercentage() {
        return ContentBlockComponent.getScrollByPercentage();
    }

    public static getDivScrollTop() {
        return ContentBlockComponent.getDivScrollTop();
    }

    public static getHeaderHight() {
        return ContentBlockComponent.getHeaderHight();
    }
}