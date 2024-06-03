import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccessCard } from './acces-card.model';

@Injectable({
  providedIn: 'root'
})
export class AccessCardService {
  private accessCards: AccessCard[] = [];
  private nextId = 1;

  cardAdded = new EventEmitter<AccessCard>();

  constructor() { 
    // Check if localStorage is available before using it
    if (typeof localStorage !== 'undefined') {
      const storedAccessCards = localStorage.getItem('accessCards');
      if (storedAccessCards) {
        this.accessCards = JSON.parse(storedAccessCards);
      }
    } else {
      console.warn('localStorage is not available. Access cards will not be stored persistently.');
    }
  }

  getAccessCards(): Observable<AccessCard[]> {
    return of(this.accessCards);
  }

  deleteAccessCard(id: number): Observable<void> {
    this.accessCards = this.accessCards.filter(card => card.id !== id);
    this.saveAccessCardsToLocalStorage();
    return of(undefined);
  }

  createAccessCard(card: AccessCard): Observable<AccessCard> {
    card.id = this.nextId++;
    this.accessCards.push(card);
    this.saveAccessCardsToLocalStorage();
    this.cardAdded.emit(card);
    return of(card);
  }

  updateAccessCard(updatedCard: AccessCard): Observable<void> {
    const index = this.accessCards.findIndex(c => c.id === updatedCard.id);
    if (index !== -1) {
      this.accessCards[index] = updatedCard;
      this.saveAccessCardsToLocalStorage();
    }
    return of(undefined);
  }

  private saveAccessCardsToLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('accessCards', JSON.stringify(this.accessCards));
    }
  }
}
