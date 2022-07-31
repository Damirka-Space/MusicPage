import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { APIController } from './server-api/controller';
import { ServerAPI } from './server-api/server.api';
import { TestAPI } from './server-api/test.api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(http: HttpClient) {
        // APIController.setAPI(new TestAPI());
        
        APIController.setAPI(new ServerAPI(http));
    }
}
