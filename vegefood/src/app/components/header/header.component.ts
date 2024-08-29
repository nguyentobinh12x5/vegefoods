import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private cartService: CartService
  ) {}

  logout() {
    this.authService.logout();
  }

  get cartItemsCount(): number {
    return this.cartService.getCartItems().length;
  }
}
