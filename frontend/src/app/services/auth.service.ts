import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../env/env';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = localStorage.getItem('auth_token');
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  getCurrentToken(): string | null {
    return this.token;
  }

  async fetchToken(): Promise<string | null> {
    try {
      // make observable to promise
      const response = await firstValueFrom(
        this.http.post<TokenResponse>(`${this.apiUrl}/token`, {})
      );

      if (response && response.token) {
        this.token = response.token;
        localStorage.setItem('auth_token', response.token);
      }
      return Promise.resolve(response?.token || null);
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  }
}
