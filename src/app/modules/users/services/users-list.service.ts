import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {UserInterface} from "@/types";
@Injectable({
  providedIn: "root"
})
export class UsersListService {

  constructor(private http: HttpClient) { }

  public fetchUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>('http://localhost:5001/users').pipe(map((response: any) => response.items))
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:5001/users/${id}`)
  }
}
