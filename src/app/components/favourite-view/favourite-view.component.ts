import { Component, inject } from '@angular/core';
import { ProductManagementService } from '../../services/product-management.service';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favourite-view',
  imports: [CommonModule, NgFor, AsyncPipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './favourite-view.component.html',
  styleUrl: './favourite-view.component.scss'
})
export class FavouriteViewComponent {

  // Inject the ProductManagementService to access product state and favorite logic
  public productState = inject(ProductManagementService);

  // Create an observable of favorited products
  // - products$ emits the list of all products
  // - map() filters the products to only include those marked as favorite
  favorites$ = this.productState.products$.pipe(
    map(products =>
      products.filter(p => this.productState.isFavorite(p.id)) // Keep only products marked as favorite
    )
  );

  // Lifecycle hook for initialization
  // Currently empty, but can be used for additional setup if needed
  ngOnInit() { }

  // Toggle a product as favorite or remove from favorites
  // Calls the service method to update the state
  toggleFavorite(productId: string) {
    this.productState.toggleFavorite(productId);
  }

}
