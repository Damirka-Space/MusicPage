import { AfterViewInit, Component, OnInit } from "@angular/core";
import { PageSelector } from "../content-pages/page.selector";


@Component({
    selector: 'nav-bar-component',
    templateUrl: 'nav.bar.component.html',
    styleUrls: ['nav.bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {

    constructor() {

    }

    ngAfterViewInit(): void {
        PageSelector.selectMainPage();
    }

    protected selectMain() {
        PageSelector.selectMainPage();;
    }

    protected selectFind() {
        PageSelector.selectFindPage();
    }

    protected selectCollections() {
        PageSelector.selectCollectionsPage();
    }

    protected selectStream() {
        PageSelector.selectStreamPage();
    }
}
