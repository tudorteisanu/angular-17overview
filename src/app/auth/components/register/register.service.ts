import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegisterInputInterface } from "@/auth/types/register-input.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http =  inject(HttpClient);

  register(payload: RegisterInputInterface): Observable<any> {
    return this.http.post('http://localhost:5001/register', payload)
  }
}
