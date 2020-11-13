import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { BooleanComponent } from './question/boolean/boolean.component';
import { MultipleComponent } from './question/multiple/multiple.component';
import { Question, QuestionType, QuestionTypeBase } from './question/question.model';

import { QuestionService } from './question/question.service';
import { TextComponent } from './question/text/text.component';
import { SummaryComponent } from './summary/summary/summary.component';

@Component({
  selector: 'scx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('quizScreen', {
    read: ViewContainerRef,
    static: true
  }
  ) quizScreen: ViewContainerRef;

  questions: Iterator<Question>;
  submittedQuestions: Question[] = [];
  activeQuestion: Question;
  activeViewRef: ComponentRef<any>;

  constructor(
    private questionService: QuestionService,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.start();
  }

  ngOnDestroy(): void {
    if (this.activeViewRef) {
      this.activeViewRef.destroy();
    }
  }

  // Starts the quiz with new set of questions
  start(): void {
    const questionsBatch = this.questionService.getBatch();
    this.questions = this.makeQuestionIterator(questionsBatch);
    this.next();
  }

  // To iterate over collection of questions
  next(): void {
    const next = this.questions.next();
    this.activeQuestion = next.value
    if (this.activeQuestion) {
      this.renderQuestion(this.activeQuestion);
    } else {
      this.renderSummary();
    }
  }

  // Renders summary component
  renderSummary(): void {
    this.activeViewRef = this.renderComponent(SummaryComponent);
    const instance = this.activeViewRef.instance;
    instance.submittedQuestions = this.submittedQuestions;
    instance.restart.pipe(
      take(1)
    ).subscribe(() => {
      this.submittedQuestions = [];
      this.start();
    }
    );
  }

  // Renders question components dynamically based on question type
  renderQuestion(question: Question): void {
    const component = this.getComponentByType(question.type);
    this.activeViewRef = this.renderComponent<QuestionTypeBase>(component);
    if (this.activeViewRef) {
      this.initializeQuestion(this.activeViewRef, question);
    }
  }

  /**
   * Renders given component dynamically
   * @param component {any}
   */
  renderComponent<T>(component: any): ComponentRef<T> {
    const factory = this.cfr.resolveComponentFactory<T>(component);
    let componentRef: ComponentRef<T>;
    if (factory) {
      this.quizScreen.clear();
      this.activeViewRef?.destroy();
      componentRef = this.quizScreen.createComponent<T>(factory);
    }
    return componentRef;
  }

  /**
   * Initializes the component with provided data
   * @param questionRef {ComponentRef<any>}
   * @param data {Question}
   */
  initializeQuestion(questionRef: ComponentRef<QuestionTypeBase>, data: Question): void {
    const instance = questionRef?.instance;
    if (instance) {
      instance.question = data;
      instance.next.pipe(
        take(1)
      ).subscribe((question: Question) => {
        this.saveQuestion(question);
        this.next();
      });
    }
  }

  saveQuestion(question: Question): void {
    this.submittedQuestions.push(question);
    console.log(this.submittedQuestions);
  }

  /**
   * Returns Component class base question type 
   * @param type {QuestionType}
   * @returns Component class
   */
  getComponentByType(type: QuestionType): any {
    let component;
    switch (type) {
      case QuestionType.Multiple:
        component = MultipleComponent;
        break;
      case QuestionType.Boolean:
        component = BooleanComponent;
        break;
      case QuestionType.Text:
        component = TextComponent;
        break;
      default:
        throw TypeError(`Unsupported question type '${type}'`);
    }
    return component;
  }

  /**
   * Creates iterator on collection of questions received from the api 
   * @param questions {Question[]}
   * @param start {number}
   * @param end {number}
   * @param step {number}
   * @returns Iterator<Question>
   */
  makeQuestionIterator(
    questions: Question[],
    start = 0,
    end = environment.questionsToDisplay - 1,
    step = 1
  ): Iterator<Question> {
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