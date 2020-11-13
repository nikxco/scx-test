import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QuestionModule } from './question/question.module';
import { MultipleComponent } from './question/multiple/multiple.component';
import { BooleanComponent } from './question/boolean/boolean.component';
import { TextComponent } from './question/text/text.component';

import { SummaryModule } from './summary/summary.module';
import { QuestionService } from './question/question.service';
import { Question } from './question/question.model';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionModule,
    SummaryModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: prepareQuestions,
      deps: [
        QuestionService
      ],
      multi: true
    }
  ],
  entryComponents: [
    MultipleComponent,
    BooleanComponent,
    TextComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function prepareQuestions(questionService: QuestionService) {
  return () => new Promise((resolve, reject) => {
    questionService.fetchQuestions().subscribe((questions: Question[]) => {
      questionService.questions = questions;
      resolve();
    }, (err) => reject(err));
  });
}