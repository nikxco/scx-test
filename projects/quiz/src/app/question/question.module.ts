import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleComponent } from './multiple/multiple.component';
import { BooleanComponent } from './boolean/boolean.component';
import { TextComponent } from './text/text.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MultipleComponent, BooleanComponent, TextComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    MultipleComponent,
    BooleanComponent,
    TextComponent,
  ]
})
export class QuestionModule { }
