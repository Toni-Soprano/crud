import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signupUsers:any[]=[];
  signupObj: any = {
    email:'',
    userName: '',
    password: ''
  };

  loginObj: any = {
    userName: 'omar',
    password: '123456'
  };

  constructor(private router: Router) { }
  ngOnInit(): void {}
  login() {
    alert("user logged in ")
    // Simulate login logic here, for demonstration purposes always redirect
    this.router.navigate(['/main']);
  }
}
