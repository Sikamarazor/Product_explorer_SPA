import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductManagementService } from '../../services/product-management.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details-view',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-details-view.component.html',
  styleUrl: './product-details-view.component.scss'
})
export class ProductDetailsViewComponent {
  // Inject the current ActivatedRoute to access route parameters
  private route = inject(ActivatedRoute);

  // Inject the ProductManagementService to access product data and favorites
  service = inject(ProductManagementService);

  // Holds the currently viewed product; can be undefined if product not found
  product!: Product | undefined;

  // Constructor initializes the component and subscribes to route changes
  constructor(private router: Router) {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          // Get the 'id' parameter from the route (string)
          const id = params.get('id')!;
          // Return the observable of all products from the service
          return this.service.products$;
        })
      )
      .subscribe(products => {
        // Get the route param again via snapshot (safer after async operations)
        const id = this.route.snapshot.paramMap.get('id')!;
        // Find the product in the list that matches the route ID
        this.product = products.find(p => p.id === id);
      });
  }

  // Navigate back to the home/catalog page
  goBack() {
    this.router.navigate(['/home']);
  }

  // Toggle the favorite status of the current product
  toggleFavorite(id: string) {
    this.service.toggleFavorite(id);
  }
}
