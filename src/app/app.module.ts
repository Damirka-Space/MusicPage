import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContentBlockComponent } from './content-block/content.block.component';
import { CollectionsPageComponent } from './content-pages/collections/collections.page.component';
import { FindPageComponent } from './content-pages/find/find.page.component';
import { BlockComponent } from './content-pages/main/block/block.component';
import { CardComponent } from './content-pages/main/block/card/card.component';
import { MainPageComponent } from './content-pages/main/main.page.component';
import { StreamPageComponent } from './content-pages/stream/stream.page.component';
import { NavBarComponent } from './nav-bar/nav.bar.component';
import { PlaylistTableComponent } from './content-pages/playlist/table/playlist.table.component';
import { PlaylistPageComponent } from './content-pages/playlist/playlist.page.component';
import { PlayerComponent } from './player-block/player.component';

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'find', component: FindPageComponent},
  {path: 'collections', component: CollectionsPageComponent},
  {path: 'stream', component: StreamPageComponent},
  {path: 'album/:id', component: PlaylistPageComponent},

]


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
    CardComponent,
    PlaylistPageComponent,
    PlaylistTableComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressBarModule,
    MatSliderModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
