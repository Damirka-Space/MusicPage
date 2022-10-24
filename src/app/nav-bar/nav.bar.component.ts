import { AfterViewInit, Component, OnInit } from "@angular/core";
import { PageSelector } from "../content-pages/page.selector";
import { Router } from '@angular/router';


@Component({
    selector: 'nav-bar-component',
    templateUrl: 'nav.bar.component.html',
    styleUrls: ['nav.bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {

    constructor(private router: Router) {

    }

    ngAfterViewInit(): void {
        this.selectMain();
    }

    protected selectMain() {
        this.router.navigate(['']);
    }

    protected selectFind() {
        this.router.navigate(['find']);
    }

    protected selectCollections() {
        this.router.navigate(['collections']);
    }

    protected selectStream() {
        this.router.navigate(['stream']);
    }
}
