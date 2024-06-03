import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../Auth-service.service'; // Update the path as per your AuthService location

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any = {
    userName: 'omar',
    password: '123456',
    role: 'admin' // Added role property
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginObj).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User logged in'
        }).then(() => {
          this.router.navigate(['/main']); // Navigate to main content
        });
      },
      () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid credentials'
        });
      }
    );
  }
}
