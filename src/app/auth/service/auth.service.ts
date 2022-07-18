import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<{ authorisation: { token: string } }>(
        environment.apiUrl + '/login',
        { email, password }
      )
      .pipe(tap((res) => this.storeToken(res.authorisation.token)));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../', 'auth']);
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post<{ authorisation: { token: string } }>(
        environment.apiUrl + '/register',
        {
          name,
          email,
          password,
        }
      )
      .pipe(tap((res) => this.storeToken(res.authorisation.token)));
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
}
