import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductManagementService } from '../../services/product-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgFor, AsyncPipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   public productState = inject(ProductManagementService);

   products$ = this.productState.products$;

  constructor(private router: Router) {}

  openDetails(id: string) {
    this.router.navigate(['/product', id]);
  }
  toggleFavorite(productId: string, event: Event) {

    event.stopPropagation()
    this.productState.toggleFavorite(productId);
  }
}
