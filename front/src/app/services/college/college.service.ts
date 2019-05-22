import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { College } from 'src/app/models/college';
import { State } from "src/app/models/State";
import { City } from 'src/app/models/city';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  url: string;
  urlState: string;
  urlCity: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/pi06/servicos/college';
    this.urlState = 'http://localhost:8080/pi06/servicos/state';
    this.urlCity = 'http://localhost:8080/pi06/servicos/city?uf=';
  }

  persist(c: College): Observable<any> {
    return this.http.post(this.url, c);
  }

  read(): Observable<College[]> {
    return this.http.get<College[]>(this.url);
  }

  readState(): Observable<State[]> {
    return this.http.get<State[]>(this.urlState);
  }
  readCity(uf): Observable<City[]> {
    return this.http.get<City[]>(this.urlCity + uf);
  }

  merge(c: College): Observable<any> {
    return this.http.put(this.url, c);
  }

  remove(c: College): Observable<any> {
    return this.http.delete(this.url + '/' + c.id);
  }
}