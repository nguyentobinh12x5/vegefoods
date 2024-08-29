import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  calculateTax(subtotal: number, location: string): number {
    let taxRate = 0;
    if (location === 'England') {
      taxRate = 0.075;
    } else if (location === 'Singapore') {
      taxRate = 0.085;
    } else {
      taxRate = 0.05;
    }
    return subtotal * taxRate;
  }
}
