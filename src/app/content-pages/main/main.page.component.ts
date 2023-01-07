import { Component, Output } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ContentBlockComponent } from "src/app/content-block/content.block.component";
import { APIController } from "src/app/server-api/controller";
import { PageComponent } from "../page.component"
import { Block } from "./block/block";


@Component({
    selector: 'main-page-component',
    templateUrl: 'main.page.component.html',
    styleUrls: ['main.page.component.scss']
})
export class MainPageComponent extends PageComponent {

    @Output() protected blocks: Block[] = [];

    constructor(private titleService:Title, private metaService: Meta) {
        super();

        APIController.mainPage().subscribe(data => {
            this.blocks = data;
        });
        
        ContentBlockComponent.resetScroll();
    }

    ngOnInit() {
        this.titleService.setTitle("Главная страница");
        this.metaService.updateTag( { property:"og:title",content:"Главная страница"});
        this.metaService.updateTag( { property:"og:type",content:"website"});
        this.metaService.updateTag( { property:"og:url",content:window.location.href});
        this.metaService.updateTag( { name:"description",content:"Добро пожаловать на главную страницу!"});
        this.metaService.updateTag( { property:"og:description",content:"Добро пожаловать на главную страницу!"});
        this.metaService.updateTag( { name: "theme-color", content:"#121212" });
        
    }

    public getBlocks() {
        return this.blocks;
    }

}