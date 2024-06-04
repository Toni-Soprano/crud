import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user is authenticated (e.g., check for auth token in localStorage)
    const isAuthenticated = localStorage.getItem('authToken') !== null;

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }

    // Check user role (assuming role is stored in localStorage or retrieved from server)
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      // If user is not an admin, restrict access and redirect to unauthorized page
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true; // Allow access for authenticated admin users
  }
}
