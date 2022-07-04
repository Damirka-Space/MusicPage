import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContentBlockComponent } from './content-block/content.block.component';
import { MainPageComponent } from './content-pages/main/main.page.component';
import { NavBarComponent } from './nav-bar/nav.bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContentBlockComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
