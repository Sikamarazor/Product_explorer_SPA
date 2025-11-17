import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FavouriteViewComponent } from './favourite-view.component';
import { ProductManagementService } from '../../services/product-management.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

describe('FavouriteViewComponent', () => {
  let component: FavouriteViewComponent;
  let fixture: ComponentFixture<FavouriteViewComponent>;

  let productService: ProductManagementService;

  const product1 = { id: '1', name: 'Product 1', price: 100, description: 'Desc A', createdAt: Date.now() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteViewComponent, MatCardModule, MatButtonModule, MatIconModule],
      providers: [ProductManagementService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FavouriteViewComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductManagementService);

    // Add products
    productService.addProduct(product1);

    // Mark product1 as favorite
    productService.toggleFavorite(product1.id);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
