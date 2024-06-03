import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessCardService } from '../acces-card.service'; // Make sure the path is correct
import { AccessCard } from '../acces-card.model'; // Make sure the path is correct
import Swal from 'sweetalert2';

@Component({
  selector: 'app-access-card-list',
   
  
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

  editCard(card: AccessCard): void {
    Swal.fire({
      title: 'Edit Access Card',
      html: `
        <input id="swal-input1" class="swal2-input" value="${card.cardId}" placeholder="Card ID">
        <input id="swal-input2" class="swal2-input" value="${card.ownerName}" placeholder="Owner Name">
        <input id="swal-input3" class="swal2-input" value="${new Date(card.validUntil).toISOString().substring(0, 10)}" placeholder="Valid Until" type="date">
        <select id="swal-input4" class="swal2-input">
          <option value="true" ${card.isActive ? 'selected' : ''}>Active</option>
          <option value="false" ${!card.isActive ? 'selected' : ''}>Inactive</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          cardId: (document.getElementById('swal-input1') as HTMLInputElement).value,
          ownerName: (document.getElementById('swal-input2') as HTMLInputElement).value,
          validUntil: new Date((document.getElementById('swal-input3') as HTMLInputElement).value),
          isActive: (document.getElementById('swal-input4') as HTMLSelectElement).value === 'true'
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCard = {
          ...card,
          cardId: result.value.cardId,
          ownerName: result.value.ownerName,
          validUntil: result.value.validUntil,
          isActive: result.value.isActive
        };

        this.accessCardService.updateAccessCard(updatedCard).subscribe(() => {
          const index = this.accessCards.findIndex(c => c.id === updatedCard.id);
          if (index !== -1) {
            this.accessCards[index] = updatedCard;
          }
          Swal.fire('Success!', 'Access card has been updated successfully.', 'success');
        });
      }
    });
  }
}
