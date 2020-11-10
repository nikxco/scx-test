import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleComponent } from './multiple/multiple.component';
import { BooleanComponent } from './boolean/boolean.component';
import { TextComponent } from './text/text.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MultipleComponent, BooleanComponent, TextComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MultipleComponent,
    BooleanComponent,
    TextComponent,
  ]
})
export class QuestionModule { }
