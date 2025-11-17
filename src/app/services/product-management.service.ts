import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

const FAVORITES_KEY = 'favorites';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  // Key used to store products in localStorage
  private readonly STORAGE_KEY = 'products';

  // BehaviorSubject that holds the current list of products
  // Components can subscribe to products$ to get updates
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  // BehaviorSubject that holds the current set of favorited product IDs
  // Initialized from localStorage
  private favoritesSubject = new BehaviorSubject<Set<string>>(this.readFavorites());
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    // On service initialization, load products from localStorage
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.productsSubject.next(JSON.parse(stored));
    }
  }

  // Persist the current list of products to localStorage
  private persist(products: Product[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }

  // Synchronously get the current list of products
  get currentProducts(): Product[] {
    return this.productsSubject.value;
  }

  // Add a new product to the state and persist it
  addProduct(product: Product) {
    const updated = [...this.currentProducts, product];
    this.productsSubject.next(updated);
    this.persist(updated);
  }

  // Update an existing product by ID and persist
  updateProduct(product: Product) {
    const updated = this.currentProducts.map(p =>
      p.id === product.id ? product : p
    );
    this.productsSubject.next(updated);
    this.persist(updated);
  }

  // Delete a product by ID and persist
  deleteProduct(id: string) {
    const updated = this.currentProducts.filter(p => p.id !== id);
    this.productsSubject.next(updated);
    this.persist(updated);
  }

  // --- FAVORITES MANAGEMENT ---

  // Toggle the favorite status of a product
  toggleFavorite(productId: string) {
    const current = new Set(this.favoritesSubject.value);
    if (current.has(productId)) current.delete(productId);
    else current.add(productId);

    this.favoritesSubject.next(current);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(current)));
  }

  // Check if a product is currently favorited
  isFavorite(productId: string): boolean {
    return this.favoritesSubject.value.has(productId);
  }

  // Read favorites from localStorage (used during initialization)
  private readFavorites(): Set<string> {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (!raw) return new Set();
      return new Set(JSON.parse(raw));
    } catch {
      return new Set(); // fallback if parsing fails
    }
  }
}
