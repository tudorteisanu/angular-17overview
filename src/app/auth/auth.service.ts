import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInterface } from "@/core/types";
import { FetchUserResponseInterface } from "@/auth/types";
import { map } from "rxjs/operators";
import { RefreshTokenResponseInterface } from "@/auth/types";

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

  refreshToken(token: string): Observable<RefreshTokenResponseInterface> {
    return this.http.get<RefreshTokenResponseInterface>('http://localhost:5001/refresh', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
