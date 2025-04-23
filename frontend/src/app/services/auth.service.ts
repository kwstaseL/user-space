import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../env/env';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // if we ever want to subscribe for changes
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('auth_token')
  );
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getCurrentToken(): string | null {
    return this.tokenSubject.value;
  }

  async fetchToken(): Promise<string | null> {
    try {
      // since toPromise is deprecated:
      const response = await firstValueFrom(
        this.http.post<TokenResponse>(`${this.apiUrl}/token`, {}).pipe(
          tap((response) => {
            if (response && response.token) {
              this.tokenSubject.next(response.token);
              localStorage.setItem('auth_token', response.token);
            }
          })
        )
      );
      return response?.token || null;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  }
}
