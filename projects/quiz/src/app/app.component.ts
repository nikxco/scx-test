import { Component, OnInit } from '@angular/core';
import { Question } from './question/question.model';

import { QuestionService } from './question/question.service';

@Component({
  selector: 'scx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  questions: Iterator<Question>;
  isQuizFinished: boolean;
  activeQuestion: Question;
  constructor(
    private questionService: QuestionService
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