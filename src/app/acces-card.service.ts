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
    const storedCards = localStorage.getItem('accessCards');
    if (storedCards) {
      this.accessCards = JSON.parse(storedCards);
      this.nextId = this.accessCards.length > 0 ? Math.max(...this.accessCards.map(card => card.id)) + 1 : 1;
    }
  }

  getAccessCards(): Observable<AccessCard[]> {
    return of(this.accessCards);
  }

  deleteAccessCard(id: number): Observable<void> {
    this.accessCards = this.accessCards.filter(card => card.id !== id);
    localStorage.setItem('accessCards', JSON.stringify(this.accessCards));
    return of(undefined);
  }

  createAccessCard(card: AccessCard): Observable<AccessCard> {
    card.id = this.nextId++;
    this.accessCards.push(card);
    localStorage.setItem('accessCards', JSON.stringify(this.accessCards));
    this.cardAdded.emit(card);
    return of(card);
  }
}
