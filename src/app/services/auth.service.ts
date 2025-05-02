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

  urlApiLogin = 'http://localhost:8080/auth/login'

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
   return this.http.post<LoginResponse>(this.urlApiLogin, {email, password}).pipe(
      tap((resp) => {
        sessionStorage.setItem('token', resp.token);
      })
    )
  }

  register(name:string, email: string, password: string) {
    this.http.post<RegisterResponse>('/register', {name, email, password}).pipe(
      tap((resp) => {
        sessionStorage.setItem('email', resp.email);
      })
    )
  }
}
