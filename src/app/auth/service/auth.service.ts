import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
interface AuthResponse {
  authorisation: { token: string };
  status: 'success' | 'failed';
  message?: any;
  user?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(environment.domain + '/api/login', {
        email,
        password,
      })
      .pipe(tap((res) => this.storeToken(res?.authorisation?.token)));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../', 'auth']);
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>(environment.domain + '/api/register', {
        name,
        email,
        password,
      })
      .pipe(tap((res) => this.storeToken(res?.authorisation?.token)));
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get token() {
    return localStorage.getItem('token');
  }

  storeToken(token: string) {
    localStorage.setItem('token', token ?? null);
  }
}
