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
  private route = inject(ActivatedRoute);
  service = inject(ProductManagementService);

  product!: Product | undefined;

  constructor(private router: Router) {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id')!;
          return this.service.products$;
        })
      )
      .subscribe(products => {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.product = products.find(p => p.id === id);
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  toggleFavorite(id: string) {
    this.service.toggleFavorite(id);
  }
}
