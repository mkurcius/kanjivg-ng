import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kvg-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.scss'],
})
export class KanjiComponent implements OnInit {
  @Input()
  unicode: string;

  constructor() { }

  ngOnInit(): void {
  }

}
