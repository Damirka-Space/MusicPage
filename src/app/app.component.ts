import { Component } from '@angular/core';
import { APIController } from './server-api/controller';
import { ServerAPI } from './server-api/server.api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private serverAPI: ServerAPI) {
        // APIController.setAPI(new TestAPI());
        
        APIController.setAPI(serverAPI);
    }
}
