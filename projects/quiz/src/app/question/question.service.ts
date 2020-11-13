import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Question } from './question.model';
import { shuffle } from '../app.util';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questions: Question[];

  constructor(
    private http: HttpClient
  ) { }


  fetchQuestions(): Observable<Question[]> {
    const endpoint = environment.questions;
    return this.http.get<{ response_code: number, results: Question[] }>(endpoint)
      .pipe(
        map((response) => {
          let questions = response.results;
          questions = questions.map(this.toQuestion);
          return questions;
        })
      );
  }

  getBatch(): Question[] {
    const maxQuestions = environment.questionsToDisplay;
    let questions = shuffle(this.questions);
    return questions.slice(0, maxQuestions);
  }

  toQuestion(payload: any): Question {
    return new Question(payload);
  }

}
