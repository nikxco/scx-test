import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';



@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SummaryComponent
  ]
})
export class SummaryModule { }
