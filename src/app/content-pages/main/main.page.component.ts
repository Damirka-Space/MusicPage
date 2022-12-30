import { Component, Output } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
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

    constructor(route: ActivatedRoute, private titleService:Title, private metaService: Meta) {
        super();
        this.titleService.setTitle("Главная страница");

        if(!this.metaService.getTag("property='og:title'")){
            this.metaService.addTag( { property:"og:title",content:"Главная страница"});
            this.metaService.addTag( { property:"og:type",content:"website"});
            this.metaService.addTag( { property:"og:url",content: route.pathFromRoot.toString()});
            this.metaService.addTag( { name:"description",content:"Добро пожаловать на главную страницу!"});
            this.metaService.addTag( { property:"og:description",content:"Добро пожаловать на главную страницу!"});
            this.metaService.addTag( { property:"og:image",content:"assets/playlist/PlayButton.png"});
        }
        else {
            this.metaService.updateTag( { property:"og:title",content:"Главная страница"});
            this.metaService.updateTag( { property:"og:type",content:"website"});
            this.metaService.updateTag( { property:"og:url",content: route.pathFromRoot.toString()});
            this.metaService.updateTag( { name:"description",content:"Добро пожаловать на главную страницу!"});
            this.metaService.updateTag( { property:"og:description",content:"Добро пожаловать на главную страницу!"});
            this.metaService.updateTag( { property:"og:image",content:"assets/playlist/PlayButton.png"});
        }

        APIController.mainPage().subscribe(data => {
            this.blocks = data;
        });
        
        ContentBlockComponent.resetScroll();
    }

    public getBlocks() {
        return this.blocks;
    }

}