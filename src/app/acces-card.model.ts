export interface AccessCard {
    id: number;
    cardId: string;
    ownerName: string;
    createdAt: Date;
    validUntil: Date; // Add this line
    isActive: boolean; // Add this line
   
  }
  