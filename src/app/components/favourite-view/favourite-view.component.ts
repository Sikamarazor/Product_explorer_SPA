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

  public productState = inject(ProductManagementService);
  favorites$ = this.productState.products$.pipe(
      map(products =>
        products.filter(p => this.productState.isFavorite(p.id))
      )
    );
  
  ngOnInit() {
    
  }

  toggleFavorite(productId: string) {
    this.productState.toggleFavorite(productId);
  }
}
