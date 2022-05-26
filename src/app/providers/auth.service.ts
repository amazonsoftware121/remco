import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  logout(): void {
    localStorage.removeItem('UserId');
    localStorage.removeItem('access_token');
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.redirectUrl }});
  }
  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }
}
