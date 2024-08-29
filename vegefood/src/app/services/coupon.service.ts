import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor() {}

  private availableCoupons = [
    { code: 'SAVE10', discount: 10 },
    { code: 'FREESHIP', discount: 5 },
  ];

  validateCoupon(code: string): number {
    const coupon = this.availableCoupons.find((c) => c.code === code);
    return coupon ? coupon.discount : 0;
  }
}
