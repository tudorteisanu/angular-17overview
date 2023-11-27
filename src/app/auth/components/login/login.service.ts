import { Injectable } from '@angular/core';
import { LoginInputInterface } from "@/auth/types/login-input.interface";
import { Observable } from "rxjs";
import { LoginResponseInterface } from "@/auth/types";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(payload: LoginInputInterface): Observable<LoginResponseInterface> {
    return this.http.post<LoginResponseInterface>('http://localhost:5001/login', payload)
  }
}
