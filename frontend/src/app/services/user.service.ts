import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../entities/user';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;
  private usersUrl = `${this.baseUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.usersUrl, user);
  }

  // TODO: Fix this any to match Pageable return
  public getAllUsers(
    page: number = 0,
    pageSize: number = 20,
    sort: string = 'id,asc'
  ): Observable<any> {
    const params = `?page=${page}&size=${pageSize}&sort=${sort}`;
    return this.httpClient.get<any>(`${this.usersUrl}${params}`);
  }

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.usersUrl}/${id}`);
  }

  public deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.usersUrl}/${id}`);
  }
}
