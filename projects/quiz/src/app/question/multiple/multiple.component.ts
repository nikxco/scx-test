import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Question, QuestionTypeBase } from '../question.model';

@Component({
  selector: 'scx-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleComponent extends QuestionTypeBase implements OnInit {

  @Input() question: Question;
  @Output() next: EventEmitter<Question> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
