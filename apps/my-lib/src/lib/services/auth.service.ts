import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  // Thêm các trường khác nếu cần
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'current_user';

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser() {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', { email, password })
      .pipe(
        tap(response => {
          this.setToken(response.accessToken);
          this.setRefreshToken(response.refreshToken);
          this.setUser(response.user);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<string>('/api/auth/refresh-token', { refreshToken })
      .pipe(
        tap(response => {
          this.setToken(response);
        })
      );
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) || '';
  }

  private setRefreshToken(refreshToken: string) {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || '';
  }

  private setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getCurrentUserRoles(): string[] {
    return this.currentUserValue?.roles || [];
  }

  hasRole(role: string): boolean {
    return this.getCurrentUserRoles().includes(role);
  }
} 