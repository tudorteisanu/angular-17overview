import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { UserInterface } from "@/core/types";
import { PaginatedResponseInterface } from '@/core/types';
import { CreateUserInterface } from "@/users/types";

@Injectable({
  providedIn: "root"
})
export class UsersListService {

  constructor(private http: HttpClient) { }

  public fetchUsers(): Observable<UserInterface[]> {
    return this.http.get<PaginatedResponseInterface<UserInterface>>('/users')
      .pipe(map((response) => response.items))
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/users/${id}`)
  }

  public addUser(payload: CreateUserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>('http://localhost:5001/users', payload)
  }
}
