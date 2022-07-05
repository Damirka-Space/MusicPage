import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContentBlockComponent } from './content-block/content.block.component';
import { CollectionsPageComponent } from './content-pages/collections/collections.page.component';
import { FindPageComponent } from './content-pages/find/find.page.component';
import { BlockComponent } from './content-pages/main/block/block.component';
import { CardComponent } from './content-pages/main/block/card/card.component';
import { MainPageComponent } from './content-pages/main/main.page.component';
import { StreamPageComponent } from './content-pages/stream/stream.page.component';
import { NavBarComponent } from './nav-bar/nav.bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContentBlockComponent,
    MainPageComponent,
    StreamPageComponent,
    FindPageComponent,
    CollectionsPageComponent,
    BlockComponent,
    CardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
