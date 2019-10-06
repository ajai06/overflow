import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  keywords;

  questionsUrl = 'http://forum.mashuptest.com/api/question';
  searchUrl = 'http://forum.mashuptest.com/api/question/search?keyword=' + this.keywords;
  myquestionUrl = 'http://forum.mashuptest.com/api/question/my-questions';
  myAnswerUrl = 'http://forum.mashuptest.com/api/question/answered-by-me';
  customUrl = 'http://forum.mashuptest.com/api/answer';

  constructor(private http: HttpClient) { }


  getQuestions(): Observable<any> {
    return this.http.get<any>(this.questionsUrl);
  }

  getQuestion(id: number) {
   const questionUrl = `${this.questionsUrl}/${id}`;
   return this.http.get<any>(questionUrl);
  }

  questionSearch() {
     console.log(this.searchUrl);
     return this.http.get<any>(this.searchUrl).pipe(
      map(res => res));
  }

  updateKeyword(keywordss) {
    this.keywords = keywordss;
    console.log(this.keywords);
  }

  askQuestion(ask) {
    return this.http.post<any>(this.questionsUrl, ask);
  }

  postAnswer(id: number, answer) {
    const answerUrl = `${this.questionsUrl}/${id}/answer`;
    return this.http.post<any>(answerUrl, answer);
  }

  myQuestions(): Observable<any> {
    return this.http.get<any>(this.myquestionUrl);
  }

  myAnswers(): Observable<any> {
    return this.http.get<any>(this.myAnswerUrl);
  }

  deleteAnswer(id: number) {
    const delUrl = `${this.customUrl}/${id}`;
    return this.http.delete<any>(delUrl);
  }

  updateQuestion(id: number, update) {
    const updateUrl = `${this.questionsUrl}/${id}`;
    return this.http.put<any>(updateUrl, update);
  }

  deleteQuestion(id: number) {
    const deleteUrl = `${this.questionsUrl}/${id}`;
    return this.http.delete<any>(deleteUrl);
  }

  pagination() {
    return this.http.get<any>(this.questionsUrl);
  }
  editAnswer(id, editForm) {
    return this.http.put<any>(`${this.customUrl}/${id}`, editForm);
  }

}
