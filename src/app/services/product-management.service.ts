import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

const FAVORITES_KEY = 'favorites';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  private readonly STORAGE_KEY = 'products';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private favoritesSubject = new BehaviorSubject<Set<string>>(this.readFavorites());
  favorites$ = this.favoritesSubject.asObservable();

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

  // --- FAVORITES MANAGEMENT ---
  toggleFavorite(productId: string) {
    const current = new Set(this.favoritesSubject.value);
    if (current.has(productId)) current.delete(productId);
    else current.add(productId);

    this.favoritesSubject.next(current);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(current)));
  }

  isFavorite(productId: string): boolean {
    return this.favoritesSubject.value.has(productId);
  }

  private readFavorites(): Set<string> {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (!raw) return new Set();
      return new Set(JSON.parse(raw));
    } catch {
      return new Set();
    }
  }
}
