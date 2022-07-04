import { Component } from "@angular/core";
import { PageComponent } from "../page.component"


@Component({
    selector: 'main-page-component',
    templateUrl: 'main.page.component.html',
    styleUrls: ['main.page.component.scss']
})
export class MainPageComponent implements PageComponent {

    constructor() {
    }

}