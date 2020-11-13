import { Question } from '../question/question.model';

export class Summary {
    private _totalQuestions: number;
    private _correctAnswers: number;
    private _incorrectAnswers: number;
    private _questionsAnswered: number;
    private _questionsSkipped: number;
    private _scorePercentage: string;

    constructor(payload) {
        this._init(payload);
    }

    private _init(submittedQuestions: Question[]) {
        this._totalQuestions = submittedQuestions.length;

        this._correctAnswers = submittedQuestions.filter((question) => {
            return question.hasBeenAnsweredCorrectly();
        }).length;

        this._incorrectAnswers = submittedQuestions.filter((question) => {
            return !question.hasBeenAnsweredCorrectly();
        }).length;

        this._questionsAnswered = submittedQuestions.filter((question) => {
            return question.hasBeenAnswered();
        }).length;

        this._questionsSkipped = submittedQuestions.filter((question) => {
            return !question.hasBeenAnswered();
        }).length;

        let scorePercentage = (this.correctAnswers / this._totalQuestions) * 100;
        this._scorePercentage = `${scorePercentage.toFixed(1)}%`

    }

    public get totalQuestions(): number {
        return this._totalQuestions;
    }

    public get correctAnswers(): number {
        return this._correctAnswers;
    }

    public get incorrectAnswers(): number {
        return this._incorrectAnswers;
    }

    public get questionsAnswered(): number {
        return this._questionsAnswered;
    }

    public get questionsSkipped(): number {
        return this._questionsSkipped;
    }

    public get scorePercentage(): string {
        return this._scorePercentage;
    }
}