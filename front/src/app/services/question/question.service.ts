import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/pi06/servicos/question';
  }

  persist(q: Question): Observable<any> {
    return this.http.post(this.url, q)
  }

  read(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url);
  }

  merge(q: Question): Observable<any> {
    return this.http.put(this.url, q);
  }
  
  remove(q: Question): Observable<any> {
    return this.http.delete(this.url + '/' + q.id);
  }
}
