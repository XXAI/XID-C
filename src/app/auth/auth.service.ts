import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';


import { User } from './models/user';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();  
  constructor(private http: HttpClient, private router: Router) {   }
  

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuth(): boolean {
    
    return !!this.getToken();
  }


  logIn(email: string, password: string):Observable<any> {
    const url = `${environment.base_url}/signin`;
    return this.http.post<User>(url, { email, password}).pipe(
      map( (response) => {
        if(response.token){
          localStorage.setItem('token', response.token);
          this.authChange.next(true);
        }
        return response;
      }
    ));
  }

  signUp(payload) {
    const url = `${environment.base_url}/signup`;
    return this.http.post<User>(url,payload).pipe(
      map( (response) => {
        if(response.token){
          localStorage.setItem('token', response.token);
          this.authChange.next(true);
        }
        return response;
      }
    ));
  }

  logout() {
    //this.user = null;
    localStorage.removeItem('token');
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
}
