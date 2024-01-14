import { Component, Input, OnInit } from '@angular/core';
import { Block } from 'src/app/content-pages/main/block/block';
import { Card } from 'src/app/content-pages/main/block/card/card';

@Component({
  selector: 'album-block-component',
  templateUrl: './album-block.component.html',
  styleUrls: ['./album-block.component.scss'],
})
export class AlbumBlockComponent {
  @Input() block!: Block;

  constructor() { }
  public getCards(): Card[] {
    return this.block.getCards();
  }
  public getTitle(): string {
    return this.block.getTitle();
  }
}
