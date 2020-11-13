import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Question, QuestionTypeBase } from '../question.model';

@Component({
  selector: 'scx-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends QuestionTypeBase implements OnInit {

  @Input() question: Question;
  @Output() next: EventEmitter<Question> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
