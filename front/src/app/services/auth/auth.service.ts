import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url =  "http://localhost:8085/pi06/servicos/auth";
  }

  public login(user): Observable<any>{
    return this.http.post(this.url, user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
