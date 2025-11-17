import { TestBed } from '@angular/core/testing';

import { ProductManagementService } from './product-management.service';
import { Product } from '../models/product.model';

describe('ProductManagementService', () => {
  let service: ProductManagementService;

  const sampleProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 100,
    description: 'Test description',
    createdAt: Date.now(),
  };
  
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty products and favorites', () => {
    expect(service.currentProducts.length).toBe(0);
    expect(service.isFavorite(sampleProduct.id)).toBeFalse();
  });

  it('should add a product', () => {
    service.addProduct(sampleProduct);
    expect(service.currentProducts.length).toBe(1);
    expect(service.currentProducts[0]).toEqual(sampleProduct);

    // persisted in localStorage
    const stored = JSON.parse(localStorage.getItem('products')!);
    expect(stored.length).toBe(1);
    expect(stored[0].name).toBe('Test Product');
  });

  it('should update a product', () => {
    service.addProduct(sampleProduct);

    const updatedProduct = { ...sampleProduct, price: 200 };
    service.updateProduct(updatedProduct);

    const p = service.currentProducts.find(p => p.id === sampleProduct.id)!;
    expect(p.price).toBe(200);
  });

  it('should delete a product', () => {
    service.addProduct(sampleProduct);
    service.deleteProduct(sampleProduct.id);

    expect(service.currentProducts.length).toBe(0);
    expect(JSON.parse(localStorage.getItem('products')!).length).toBe(0);
  });

  it('should return correct currentProducts synchronously', () => {
    service.addProduct(sampleProduct);
    expect(service.currentProducts[0].name).toBe('Test Product');
  });

  // --- Favorites tests ---
  it('should toggle a product as favorite', () => {
    expect(service.isFavorite(sampleProduct.id)).toBeFalse();

    service.toggleFavorite(sampleProduct.id);
    expect(service.isFavorite(sampleProduct.id)).toBeTrue();

    service.toggleFavorite(sampleProduct.id);
    expect(service.isFavorite(sampleProduct.id)).toBeFalse();
  });

  it('should persist favorites to localStorage', () => {
    service.toggleFavorite(sampleProduct.id);
    const stored = JSON.parse(localStorage.getItem('favorites')!);
    expect(stored).toContain(sampleProduct.id);
  });
});
