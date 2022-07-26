import { Component, Inject, Injectable } from '@angular/core';
import { APIController } from './server-api/controller';
import { TestAPI } from './server-api/test.api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor() {
        APIController.setAPI(new TestAPI());
    }
}
