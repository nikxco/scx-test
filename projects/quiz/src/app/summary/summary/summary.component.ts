import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Summary } from '../summary.model';
import { Question } from '../../question/question.model';

@Component({
  selector: 'scx-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {


  private _summary: Summary;

  @Input() set submittedQuestions(questions: Question[]) {
    if (questions && Array.isArray(questions)) {

      this._summary = new Summary(questions);
    }
  }

  @Output() restart: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public get totalQuestions(): number {
    return this._summary?.totalQuestions;
  }

  public get correctAnswers(): number {
    return this._summary?.correctAnswers;
  }

  public get incorrectAnswers(): number {
    return this._summary?.incorrectAnswers;
  }

  public get questionsAnswered(): number {
    return this._summary?.questionsAnswered;
  }

  public get questionsSkipped(): number {
    return this._summary?.questionsSkipped;
  }

  public get scorePercentage(): string {
    return this._summary?.scorePercentage;
  }

  onRestart(): void {
    this.restart.emit(true);
  }

}
