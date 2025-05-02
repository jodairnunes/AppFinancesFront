import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

export interface LoginResponse{
  email: string,
  token: string,
}

export interface RegisterResponse{
  name: string,
  email: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlApiAuth = 'http://localhost:8080/auth/'

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
   return this.http.post<LoginResponse>(this.urlApiAuth + 'login', {email, password}).pipe(
      tap((resp) => {
        sessionStorage.setItem('token', resp.token);
      })
    )
  }

  register(name:string, email: string, password: string) {
    return this.http.post<RegisterResponse>(this.urlApiAuth + 'register', {name, email, password}).pipe(
      tap((resp) => {
        sessionStorage.setItem('email', resp.email);
      })
    )
  }
}
