import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export enum QuestionType {
    Multiple = 'multiple',
    Boolean = 'boolean',
    Text = 'text'
}
export enum QuestionDifficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}
export class Question {
    private _category: string;
    private _type: QuestionType;
    private _difficulty: QuestionDifficulty;
    private _question: string;
    private _correct_answer: string;
    private _incorrect_answers: string[];
    private _submittedAnswer: string;

    constructor(payload) {
        this._init(payload);
    }

    private _init(payload: any): void {
        this._category = payload.category;
        this._type = payload.type;
        this._difficulty = payload.difficulty;
        this._question = payload.question;
        this._correct_answer = payload.correct_answer;
        this._incorrect_answers = payload.incorrect_answers;
    }

    public get category(): string {
        return this._category;
    }
    public get type(): QuestionType {
        return this._type;
    }
    public get difficulty(): QuestionDifficulty {
        return this._difficulty;
    }

    public get question(): string {
        return this._question;
    }

    public get answers(): string[] {
        let answers = []
        if (this._incorrect_answers) {
            answers.push(...this._incorrect_answers);
        }
        answers.push(this._correct_answer);
        return answers;
    }

    public setAnswer(answer: string) {
        this._submittedAnswer = answer;
    }

    public hasBeenAnswered(): boolean {
        return !!this._submittedAnswer;
    }

    public hasBeenAnsweredCorrectly(): boolean {
        return this.hasBeenAnswered() &&
            this._submittedAnswer === this._correct_answer;
    }

    public reset(): void {
        this._submittedAnswer = null;
    }
}

export class QuestionTypeBase {
    question: Question;
    next: EventEmitter<Question>;
    submittedAnswer: FormControl = new FormControl(null);
    private _destroy: Subject<boolean> = new Subject();
    constructor() {
        this.submittedAnswer.valueChanges.pipe(
            takeUntil(this._destroy)
        ).subscribe((answer: string) => {
            this.question.setAnswer(answer);
        })
    }

    get title(): string {
        let title = this.question?.question;
        return title
    }

    get answers(): string[] {
        let answers = this.question?.answers;
        return answers
    }

    onNext(): void {
        this.next.emit(this.question);
        this._destroy.next(true);
    }
}