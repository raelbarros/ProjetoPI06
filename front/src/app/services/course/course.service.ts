import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url: string

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:8085/pi06/servicos/course';
  }

  persist(c: Course): Observable<any> {
    return this.http.post(this.url, c);
  }

  read(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  merge(c: Course): Observable<any> {
    return this.http.put(this.url, c);
  }

  remove(c: Course): Observable<any> {
    return this.http.delete(this.url + '/' + c.id);
  }
}
