import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContentBlockComponent } from './content-block/content.block.component';
import { NavBarComponent } from './nav-bar/nav.bar.component';
import { PlayerComponent } from './player-block/player.component';
// import { ContentBlockModule } from './content-block/content.block-module';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './content-pages/main/main.page.component';
import { FindPageComponent } from './content-pages/find/find.page.component';
import { CollectionsPageComponent } from './content-pages/collections/collections.page.component';
import { StreamPageComponent } from './content-pages/stream/stream.page.component';
import { PlaylistPageComponent } from './content-pages/playlist/playlist.page.component';
import { NotFoundPageComponent } from './content-pages/not-found/not-found.page.component';
import { BlockComponent } from './content-pages/main/block/block.component';
import { CardComponent } from './content-pages/main/block/card/card.component';
import { PlaylistTableComponent } from './content-pages/playlist/table/playlist.table.component';


const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: 'find', component: FindPageComponent},
  {path: 'collections', component: CollectionsPageComponent},
  {path: 'stream', component: StreamPageComponent},
  {path: 'album/:id', component: PlaylistPageComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PlayerComponent,
    ContentBlockComponent,
    MainPageComponent,
    FindPageComponent,
    CollectionsPageComponent,
    StreamPageComponent,
    PlaylistPageComponent,
    NotFoundPageComponent,
    BlockComponent,
    CardComponent,
    PlaylistTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressBarModule,
    MatSliderModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
