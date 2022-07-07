import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";
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
    }

    public static getScrollByPercentage() {
        return this.div.scrollTop / (this.div.scrollHeight - this.div.clientHeight) * 100;
    }

    public static getScrollableDiv() {
        return this.div;
    }

}