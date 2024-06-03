import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccessCardService } from '../acces-card.service';
import { AccessCard } from '../acces-card.model';
import Swal from 'sweetalert2';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-manage-access',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-access.component.html',
  styleUrls: ['./manage-access.component.css']
})
export class ManageAccessComponent {
  accessCard: AccessCard = {
    id: 0,
    cardId: '',
    ownerName: '',
    createdAt: new Date(),
    validUntil: new Date(),
    isActive: true,
    
  };

  constructor(private accessCardService: AccessCardService) { }

  createAccessCard(): void {
    // Check if all fields are set
    if (!this.accessCard.cardId || !this.accessCard.ownerName || !this.accessCard.validUntil) {
      // Display an error message
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return; // Exit the function if fields are not set
    }

    // Proceed with creating the access card
    this.accessCardService.createAccessCard(this.accessCard);
    this.accessCard = {
      id: 0,
      cardId: '',
      ownerName: '',
      createdAt: new Date(),
      validUntil: new Date(),
      isActive: true
    };

    // Display success message
    Swal.fire({
      title: 'Success!',
      text: 'Access card has been created successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
