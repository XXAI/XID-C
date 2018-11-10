import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileChange = new Subject<any>();  
  
  private profile:any = { }
  
  constructor(private http: HttpClient) { }
/*
  getProfile():any {
    return {...this.profile};
  }*/

  getServerProfile():Observable<any> {
    const url = `${environment.base_url}/jwt/v1/perfil`;
    return this.http.get<any>(url).pipe(
      map( response => {
        this.profile = response.data;
        this.profileChange.next({...this.profile});
        return response;
      })
    );
  }

  resetPassword(current_password:string, new_password: string):Observable<any> {
    const url = `${environment.base_url}/jwt/v1/reset-password`;
    return this.http.put<any>(url, {current_password, new_password});
  }
}
