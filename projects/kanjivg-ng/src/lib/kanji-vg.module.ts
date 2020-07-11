import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KanjiComponent } from './kanji.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [KanjiComponent],
  exports: [KanjiComponent],
})
export class KanjiVGModule {}
