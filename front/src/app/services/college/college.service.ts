import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  url: string

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:8080/pi06/servicos/college';
  }

  persist(c: Course): Observable<any> {
    return this.http.post(this.url, c);
    console.log('inseriu')
  }

  read(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}
