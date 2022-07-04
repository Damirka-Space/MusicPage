import { Component, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { PageComponent } from "../content-pages/page.component";
import { PageController } from "../content-pages/page.controller";



@Component({
    selector: 'content-block-component',
    templateUrl: 'content.block.component.html',
    styleUrls: ['content.block.component.scss']
})
export class ContentBlockComponent {
    @ViewChild('container', { read: ViewContainerRef })
    container!: ViewContainerRef;

    constructor() {
        PageController.setContentBlockComponent(this);
    }

    public setComponent(componentClass: Type<PageComponent>) {
        // Create component dynamically inside the ng-template
        this.container.clear();
        this.container.createComponent(componentClass);
    }

}