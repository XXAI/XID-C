import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getStatus(): Observable<User> {
    const url = `${environment.base_url}/status`;
    return this.http.get<User>(url);
  }

  logIn(email: string, password: string):Observable<any> {
    const url = `${environment.base_url}/login`;
    return this.http.post<User>(url, { email, password});
  }

  signUp(email:string, password: string) {
    const url = `${environment.base_url}/register`;
    return this.http.post<User>(url,{email, password});
  }
}
