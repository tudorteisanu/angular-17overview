import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInterface } from "@/core/types";
import { FetchUserResponseInterface, LoginResponseInterface } from "@/auth/types";
import { map } from "rxjs/operators";
import { LoginInputInterface } from "@/auth/types/login-input.interface";
import { RefreshTokenResponseInterface } from "@/auth/types";
import { RegisterInputInterface } from "@/auth/types/register-input.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  fetchUser(): Observable<UserInterface> {
    return this.http.get<FetchUserResponseInterface>('/check')
      .pipe(
      map(({user}) => user)
    )
  }

  login(payload: LoginInputInterface): Observable<LoginResponseInterface> {
    return this.http.post<LoginResponseInterface>('http://localhost:5001/login', payload)
  }

  register(payload: RegisterInputInterface): Observable<any> {
    return this.http.post('http://localhost:5001/register', payload)
  }

  refreshToken(token: string): Observable<RefreshTokenResponseInterface> {
    return this.http.get<RefreshTokenResponseInterface>('http://localhost:5001/refresh', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
