import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Simulate login logic, replace this with actual authentication logic
  login(credentials: { userName: string; password: string; }): Observable<boolean> {
    // Replace this with actual authentication logic, e.g., API call
    if (credentials.userName === 'omar' && credentials.password === '123456') {
      this.isAuthenticatedSubject.next(true);
      return of(true); // Simulated successful login
    } else {
      this.isAuthenticatedSubject.next(false);
      return of(false); // Simulated failed login
    }
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    // Other logout logic, such as clearing session storage or cookies
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
