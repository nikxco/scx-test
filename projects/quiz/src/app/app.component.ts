import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BooleanComponent } from './question/boolean/boolean.component';
import { MultipleComponent } from './question/multiple/multiple.component';
import { Question, QuestionType } from './question/question.model';

import { QuestionService } from './question/question.service';
import { TextComponent } from './question/text/text.component';

@Component({
  selector: 'scx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('questionPlaceholder', { read: ViewContainerRef, static: true }) questionPlaceholder: ViewContainerRef;

  questions: Iterator<Question>;
  isQuizFinished: boolean;
  activeQuestion: Question;
  constructor(
    private questionService: QuestionService,
    private cfr: ComponentFactoryResolver
  ) { }
  ngOnInit(): void {
    this.questionService.fetchQuestions().subscribe((questions: Question[]) => {
      this.questions = this._makeQuestionIterator(questions);
      this.next();
    });
  }

  next(): void {
    const next = this.questions.next();
    this.activeQuestion = next.value
    this.isQuizFinished = next.done;
    if (!this.isQuizFinished) {
      this.renderQuestion(this.activeQuestion);
    }
  }

  renderQuestion(question: Question): void {
    let componentRef;
    switch (question.type) {
      case QuestionType.Multiple:
        componentRef = this.cfr.resolveComponentFactory(MultipleComponent);
        break;
      case QuestionType.Boolean:
        componentRef = this.cfr.resolveComponentFactory(BooleanComponent);
        break;
      case QuestionType.Text:
        componentRef = this.cfr.resolveComponentFactory(TextComponent);
        break;
      default:
        //Not supported question type
        break;
    }
    if (componentRef) {
      this.questionPlaceholder.clear();
      this.questionPlaceholder.createComponent(componentRef);
    }
  }

  private _makeQuestionIterator(questions: Question[], start = 0, end = 4, step = 1) {
    let nextIndex = start;
    const iterator = {
      next: () => {
        const question = questions[nextIndex];
        nextIndex += step;
        return { value: question, done: nextIndex > end }
      }
    }
    return iterator;
  }

}