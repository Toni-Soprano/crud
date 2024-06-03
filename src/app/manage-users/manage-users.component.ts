import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';

 
 

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  imports:[FormsModule,CommonModule],
  standalone:true,
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = { id: 0, name: '', email: '' };

  ngOnInit(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  saveUser(): void {
    const index = this.users.findIndex(user => user.id === this.selectedUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.selectedUser };
    } else {
      this.selectedUser.id = this.users.length + 1;
      this.users.push({ ...this.selectedUser });
    }

    this.saveUsersToLocalStorage();
    Swal.fire('Success', 'User details updated successfully!', 'success');
    this.selectedUser = { id: 0, name: '', email: '' };
  }

  saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
