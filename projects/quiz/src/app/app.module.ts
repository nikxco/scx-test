import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QuestionModule } from './question/question.module';
import { MultipleComponent } from './question/multiple/multiple.component';
import { BooleanComponent } from './question/boolean/boolean.component';
import { TextComponent } from './question/text/text.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionModule
  ],
  providers: [],
  entryComponents: [
    MultipleComponent,
    BooleanComponent,
    TextComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
