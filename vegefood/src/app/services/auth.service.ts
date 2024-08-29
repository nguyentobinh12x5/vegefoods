import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  register(username: string, email: string, password: string): boolean {
    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  login(email: string, password: string): boolean {
    const storedUserString = localStorage.getItem('user');
    if (!storedUserString) {
      return false;
    }

    const storedUser = JSON.parse(storedUserString);
    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem('token', 'authentication-token');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
