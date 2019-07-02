import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Survey } from 'src/app/models/survet';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:8080/pi06/servicos/survey';
  }

  persist(s: Survey): Observable<any> {
    return this.http.post(this.url, s);
  }

  read():Observable<Survey[]> {
    return this.http.get<Survey[]>(this.url);
  }

  readAllCategoryByMonth(month):Observable<Survey[]> {
    return this.http.get<Survey[]>(this.url + '/result_month/' + month);
  }

  readByTypeCollege(type):Observable<Survey[]> {
    return this.http.get<Survey[]>(this.url + '/college?type=' + type);
  }
}
