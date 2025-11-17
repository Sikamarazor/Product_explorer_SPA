import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteViewComponent } from './favourite-view.component';
import { ProductManagementService } from '../../services/product-management.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('FavouriteViewComponent', () => {
  let component: FavouriteViewComponent;
  let fixture: ComponentFixture<FavouriteViewComponent>;

  let productService: ProductManagementService;

  const product1 = { id: '1', name: 'A', price: 100, description: 'Desc A', createdAt: Date.now() };

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

  it('should only show favorited products', (done) => {
    component.favorites$.subscribe(favorites => {
      expect(favorites.length).toBe(1);
      expect(favorites[0].id).toBe('1');
      done();
    });
  });

  it('should toggle favorite and update view', (done) => {
    // Remove product1 from favorites
    component.toggleFavorite(product1.id);

    component.favorites$.subscribe(favorites => {
      expect(favorites.length).toBe(0);
      done();
    });
  });
});
