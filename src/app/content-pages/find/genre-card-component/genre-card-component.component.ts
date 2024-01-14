import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Genre } from 'src/app/entities/genre';

import { str } from 'crc-32'
import { ColorSelector } from '../../color.selector';
import { ContentBlockComponent } from 'src/app/content-block/content.block.component';
import { LinearGradientBackgroundColorHEX } from '../../background.color';
import { ColorHEX } from '../../color';

@Component({
  selector: 'genre-card-component',
  templateUrl: './genre-card-component.component.html',
  styleUrls: ['./genre-card-component.component.scss']
})
export class GenreCardComponentComponent implements OnInit, AfterViewInit {

  @Input()
  genre!: Genre

  color!: string

  colorHover!: string

  @ViewChild('container')
  container!: ElementRef

  constructor() { }

  ngOnInit(): void {
    if(this.genre.name == "") {
        this.color = "252525"
        return
    }

    this.color = Math.abs(str(this.genre.name)).toString(16);

    if(this.color.length < 8) {
      this.color += 'F'.repeat(8 - this.color.length)
    }
  }

  ngAfterViewInit() {
    var colorBase = this.color.substring(0, this.color.length - 2);

    var colorAlpha = Number.parseInt(this.color.substring(this.color.length - 2), 16)
    
    if(colorAlpha < 100) {
      colorAlpha = 100
    }

    var alpha = (colorAlpha / 2).toString(16).substring(0, 2)

    this.container.nativeElement.style.backgroundColor = "#" + colorBase + alpha;

    this.container.nativeElement.addEventListener("mouseover", (event: Event) => {
      this.container.nativeElement.style.backgroundColor = "#" + colorBase + colorAlpha.toString(16);

      ColorSelector.setBackgroundColor(new LinearGradientBackgroundColorHEX(new ColorHEX("#" + colorBase), new ColorHEX("#1f1f1f")));
      ColorSelector.setHeadeColor(new ColorHEX("#" + colorBase + "00"));
    });

    this.container.nativeElement.addEventListener("mouseout", (event: Event) => {
      this.container.nativeElement.style.backgroundColor = "#" + colorBase + alpha;

      ColorSelector.setBackgroundColor(new ColorHEX("#1f1f1f"));
      ColorSelector.setHeadeColor(ColorHEX.getNullColor());
    });
  }

  get Title() {
    return this.genre.name;
  }

  get Color() {
    return this.color;
  }

}
