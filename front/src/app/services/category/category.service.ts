import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:8080/pi06/servicos/category';
  }

  persist(c: Category): Observable<any> {
    return this.http.post(this.url, c);
  }

  read(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  merge(c: Category): Observable<any> {
    return this.http.put(this.url, c);
  }

  remove(c: Category): Observable<any> {
    return this.http.delete(this.url + '/' + c.id);
  }
}
