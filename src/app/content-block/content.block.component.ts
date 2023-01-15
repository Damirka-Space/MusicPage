import { AfterViewInit, Component, ElementRef, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { Color, ColorHEX } from "../content-pages/color";
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

    private static headerColor: Color = ColorHEX.getNullColor();
    private static backgroundColor: Color = ColorHEX.getNullColor();
    private static staticBackgroundColor: Color = ColorHEX.getGreyColor();

    @ViewChild('div') 
    _div!: ElementRef;
    private static div: HTMLElement;

    @ViewChild('header') 
    _header!: ElementRef;
    private static header: HTMLElement;

    private maxHistoryLength!: number;
    private currentHistory!: number;

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
        ContentBlockComponent.header = this._header.nativeElement;
        window.addEventListener("scroll", this.onScroll, true);
        
        this.maxHistoryLength = window.history.length;
        this.currentHistory = this.maxHistoryLength;
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.onScroll, true);
    }

    private onScroll(event: Event) {
        var v = ContentBlockComponent.div.scrollTop / (ContentBlockComponent.header.clientHeight);
        if(v > 1)
            v = 1;
        else if(v <= 0.05)
            v = 0;
        
        ContentBlockComponent.headerColor.setAlpha(v * 255);
    }

    public static getScrollByPercentage() {
        return this.div.scrollTop / (this.div.scrollHeight - this.div.clientHeight) * 100;
    }

    public static resetScroll() {
        if(this.div)
            this.div.scrollTop = 0;
    }

    public static getDivScrollTop() {
        return this.div.scrollTop;
    }

    public static getHeaderHight() {
        return this.header.clientHeight;
    }

    public static setHeaderColor(color: Color) {
        this.headerColor = color;
    }

    public static setBackgroundColor(color: Color) {
        this.backgroundColor = color;
    }

    public static setStaticBackgroundColor(color: Color) {
        this.staticBackgroundColor = color;
    }

    public getHeaderColor(): string {
        return ContentBlockComponent.headerColor.toString();
    }

    public getBackgroundColor(): string {
        return ContentBlockComponent.backgroundColor.toString();
    }

    public getStaticBacgroundColor() : string {
        return ContentBlockComponent.staticBackgroundColor.toString();
    }

    public cantGoBack() {
        return false;
    }

    public cantGoForward() {
        return false;
    }

    public goBack() {
        window.history.back();
    }

    public goForward() {
        window.history.forward();
    }

}