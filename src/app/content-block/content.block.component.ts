import { AfterViewInit, Component, ElementRef, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { Color } from "../content-pages/color";
import { PageComponent } from "../content-pages/page.component";
import { PageController } from "../content-pages/page.controller";


@Component({
    selector: 'content-block-component',
    templateUrl: 'content.block.component.html',
    styleUrls: ['content.block.component.scss']
})
export class ContentBlockComponent implements AfterViewInit{
    @ViewChild('container', { read: ViewContainerRef })
    private container!: ViewContainerRef;

    private static headerColor: Color;
    private static backgroundColor: Color;

    @ViewChild('div') 
    _div!: ElementRef;
    private static div: HTMLElement;

    constructor() {
        PageController.setContentBlockComponent(this);
    }

    public setComponent(componentClass: Type<PageComponent>) {
        // Create component dynamically inside the ng-template
        this.container.remove();
        this.container.createComponent(componentClass);
    }

    ngAfterViewInit() {
        ContentBlockComponent.div = this._div.nativeElement;
        window.addEventListener("scroll", this.onScroll, true);
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.onScroll, true);
    }

    private onScroll(event: Event) {
        
    }

    public static getScrollByPercentage() {
        return this.div.scrollTop / (this.div.scrollHeight - this.div.clientHeight) * 100;
    }

    public static getScrollableDiv() {
        return this.div;
    }

    public static setHeaderColor(color: Color) {
        this.headerColor = color;
    }

    public static setBackgroundColor(color: Color) {
        this.backgroundColor = color;
    }

    public getHeaderColor(): string {
        if(!ContentBlockComponent.headerColor)
            return "";
        return ContentBlockComponent.headerColor.toString();
    }

    public getBackgroundColor(): string {
        if(!ContentBlockComponent.backgroundColor)
            return "";
        return ContentBlockComponent.backgroundColor.toString();
    }

}