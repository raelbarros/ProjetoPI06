import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student } from 'src/app/models/sudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url: string

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:8080/pi06/servicos/student';
  }

  persist(c: Student): Observable<any> {
    return this.http.post(this.url, c);
  }

  read(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  
}
