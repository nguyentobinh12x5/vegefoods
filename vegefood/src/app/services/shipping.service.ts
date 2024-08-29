import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  constructor() {}

  private baseRate = 5;

  calculateShippingCost(location: string): number {
    if (location === 'England') {
      return this.baseRate * 3;
    } else if (location === 'Singapore') {
      return this.baseRate * 1.5;
    } else {
      return this.baseRate;
    }
  }
}
