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

  constructor(
    private http: HttpClient
  ) { }


  fetchQuestions(): Observable<Question[]> {
    const endpoint = environment.questions;
    return this.http.get<{ response_code: number, results: Question[] }>(endpoint)
      .pipe(
        map((response) => {
          let questions = shuffle(response.results).slice(0, 5);
          questions = questions.map(this.toQuestion);
          return questions
        })
      )
  }

  toQuestion(payload: any): Question {
    return new Question(payload);
  }

}
