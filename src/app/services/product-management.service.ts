import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  private readonly STORAGE_KEY = 'products';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.productsSubject.next(JSON.parse(stored));
    }
  }

  private persist(products: Product[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }

  get currentProducts(): Product[] {
    return this.productsSubject.value;
  }

  addProduct(product: Product) {
    const updated = [...this.currentProducts, product];
    this.productsSubject.next(updated);
    this.persist(updated);
  }

  updateProduct(product: Product) {
    const updated = this.currentProducts.map(p =>
      p.id === product.id ? product : p
    );
    this.productsSubject.next(updated);
    this.persist(updated);
  }

  deleteProduct(id: string) {
    const updated = this.currentProducts.filter(p => p.id !== id);
    this.productsSubject.next(updated);
    this.persist(updated);
  }
}
