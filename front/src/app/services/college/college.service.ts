import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { College } from 'src/app/models/college';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  url: string

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/pi06/servicos/college';
  }

  persist(c: College): Observable<any> {
    return this.http.post(this.url, c);
  }

  read(): Observable<College[]> {
    return this.http.get<College[]>(this.url);
  }

  merge(c: College): Observable<any> {
    return this.http.put(this.url, c);
  }

  remove(c: College): Observable<any> {
    return this.http.delete(this.url + '/' + c.id);
  }
}