import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PageSelector } from "../content-pages/page.selector";
import { Router } from '@angular/router';


@Component({
    selector: 'nav-bar-component',
    templateUrl: 'nav.bar.component.html',
    styleUrls: ['nav.bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {

    @ViewChild('home_button_mobile', {read: ElementRef})
    home_button_mobile!: ElementRef;

    @ViewChild('collections_button_mobile', {read: ElementRef})
    collections_button_mobile!: ElementRef;


    private resetButtons(): void {
        this.home_button_mobile.nativeElement.src = 'assets/playlist/Home.png'
        this.collections_button_mobile.nativeElement.src = 'assets/playlist/Collection_button.png';
    }

    constructor(private router: Router) {
        
    }

    ngAfterViewInit(): void {
        this.resetButtons();
    }

    protected selectMain() {
        this.router.navigate(['main']);
        this.resetButtons();
        this.home_button_mobile.nativeElement.src='assets/playlist/Home_blur.png';
    }

    protected selectFind() {
        this.router.navigate(['find']);
        this.resetButtons();
    }

    protected selectCollections() {
        this.router.navigate(['collection/playlists']);
        this.resetButtons();
        this.collections_button_mobile.nativeElement.src='assets/playlist/Heart_fld.png';
    }

    protected selectStream() {
        this.router.navigate(['stream']);
        this.resetButtons();
    }
}
