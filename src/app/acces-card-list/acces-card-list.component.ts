import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessCardService } from '../acces-card.service'; // Make sure the path is correct
import { AccessCard } from '../acces-card.model'; // Make sure the path is correct
import Swal from 'sweetalert2';

@Component({
  selector: 'app-access-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acces-card-list.component.html',
  styleUrls: ['./acces-card-list.component.css']
})
export class AccessCardListComponent implements OnInit {
  accessCards: AccessCard[] = [];

  constructor(private accessCardService: AccessCardService) { }

  ngOnInit(): void {
    this.accessCardService.getAccessCards().subscribe(cards => this.accessCards = cards);

    // Listen for new access card additions
    this.accessCardService.cardAdded.subscribe((newCard: AccessCard) => {
      this.accessCards.push(newCard);
    });
  }

  deleteCard(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this access card. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accessCardService.deleteAccessCard(id).subscribe(() => {
          this.accessCards = this.accessCards.filter(card => card.id !== id);
          Swal.fire('Deleted!', 'The access card has been deleted.', 'success');
        });
      }
    });
  }
}
