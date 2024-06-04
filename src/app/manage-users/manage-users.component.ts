import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

interface User {
  id: number;
  name: string;
  email: string;
  role:string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User = { id: 0, name: '', email: '' ,role:'' };
  isEditing = false;

  ngOnInit(): void {
     
  
    const testUsers: User[] = [
      { id: 1, name: 'ahmad', email: 'admin@example.com', role: 'admin' },
      { id: 2, name: 'ahmed2', email: 'operator2@example.com', role: 'operator' },
      { id: 3, name: 'ahmed3', email: 'operator3@example.com', role: 'operator' },
      { id: 5, name: 'moez', email: 'moez@example.com', role: 'operator' },
      { id: 4, name: 'ahmed4', email: 'operator4@example.com', role: 'operator' },
    ];
  
    // Check if test users already exist to avoid duplication
    const existingTestUsers = this.users.filter(user =>
      testUsers.some(testUser => testUser.email === user.email)
    );
  
    if (existingTestUsers.length === 0) {
      this.users = [...this.users, ...testUsers];
      this.filteredUsers = [...this.users];
      this.saveUsersToLocalStorage(); // Save updated users to localStorage
    }
  }
  
  

  filterUsers(event: any): void {
    const value = event.target.value; // Extract the value from the event object
    if (!value) {
      this.filteredUsers = [...this.users]; // Reset to all users when search input is empty
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
  

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.isEditing = true;
  }
  

  saveUser(): void {
    if (!this.selectedUser.name || !this.selectedUser.email) {
      Swal.fire('Error', 'Name and email are required!', 'error');
      return;
    }

    if (this.isEditing) {
      const index = this.users.findIndex(user => user.id === this.selectedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.selectedUser };
      }
    } else {
      this.selectedUser.id = this.users.length + 1;
      this.users.push({ ...this.selectedUser });
    }

    this.saveUsersToLocalStorage();
    Swal.fire('Success', 'User details updated successfully!', 'success');
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.selectedUser = { id: 0, name: '', email: '' , role:""};
    this.isEditing = false;
  }

  saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
    this.filteredUsers = [...this.users]; // Update filtered users after saving
  }
  deleteUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1); // Remove user from users array
      this.saveUsersToLocalStorage(); // Save updated users to localStorage
      Swal.fire('Success', 'User deleted successfully!', 'success');
    } else {
      Swal.fire('Error', 'User not found!', 'error');
    }
  }
}
 
