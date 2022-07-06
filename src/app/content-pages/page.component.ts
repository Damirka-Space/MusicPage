import { PageController } from "./page.controller";


export class PageComponent{
    protected params!: any[];

    constructor() {
        this.params = PageController.getParams();
    }

}
