import { EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Question, QuestionTypeBase } from '../question.model';

@Component({
  selector: 'scx-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent extends QuestionTypeBase implements OnInit {

  @Input() question: Question;
  @Output() next: EventEmitter<Question> = new EventEmitter();
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
