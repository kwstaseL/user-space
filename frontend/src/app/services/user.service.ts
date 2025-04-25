import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

import { Observable } from 'rxjs';

import { User, UserDTO } from '../entities/user';
import { PageResponse } from '../types/PageResponse';

import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;
  private usersUrl = `${this.baseUrl}/api/users`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getCurrentToken();
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  public createUser(user: UserDTO): Observable<User> {
    return this.httpClient.post<User>(this.usersUrl, user, {
      headers: this.getAuthHeaders(),
    });
  }

  public updateUser(userId: number, user: UserDTO): Observable<User> {
    return this.httpClient.patch<User>(`${this.usersUrl}/${userId}`, user, {
      headers: this.getAuthHeaders(),
    });
  }

  public getAllUsers(
    page: number = 0,
    pageSize: number = 20,
    sort: string = 'id,asc'
  ): Observable<PageResponse<User>> {
    const params = `?page=${page}&size=${pageSize}&sort=${sort}`;
    return this.httpClient.get<PageResponse<User>>(
      `${this.usersUrl}${params}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.usersUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  public deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.usersUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
