import { shuffle } from "../app.util";

export enum QuestionType {
    Multiple = 'multiple',
    Boolean = 'boolean',
    Text = 'Text'
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

    constructor({ category, type, difficulty, question, correct_answer, incorrect_answers }) {
        this._category = category;
        this._type = type;
        this._difficulty = difficulty;
        this._question = question;
        this._correct_answer = correct_answer;
        this._incorrect_answers = incorrect_answers;
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
        let answers = [...this._incorrect_answers, this._correct_answer];

        // Optionally we shuffle the answers
        answers = shuffle(answers);

        return answers;
    }

    public setAnswer(answer: string) {
        this._submittedAnswer = answer;
    }

    public hasBeenAnsweredCorrectly(): boolean {
        return this._submittedAnswer &&
            this._submittedAnswer === this._correct_answer;
    }
}