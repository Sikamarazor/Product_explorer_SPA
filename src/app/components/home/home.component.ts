import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductManagementService } from '../../services/product-management.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgFor, AsyncPipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   public productState = inject(ProductManagementService);

   products$ = this.productState.products$;

  constructor() {}

  toggleFavorite(productId: string) {
    this.productState.toggleFavorite(productId);
  }
}
