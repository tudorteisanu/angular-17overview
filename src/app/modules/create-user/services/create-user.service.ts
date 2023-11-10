import { Injectable } from '@angular/core';
import {CreateUserInputInterface} from "@/modules/create-user/types";
import {Observable} from "rxjs";
import {UserInterface} from "@/types";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private http: HttpClient) { }

  public addUser(payload: CreateUserInputInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>('http://localhost:5001/users', payload)
  }
}
