import { Directive, OnInit } from "@angular/core";
import { PageController } from "./page.controller";


@Directive()
export class PageComponent implements OnInit {
    protected params!: any[];

    ngOnInit(): void {
        this.params = PageController.getParams();
    }

}
