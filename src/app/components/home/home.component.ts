import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementService } from '../../services/product-management.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  // Inject the ProductManagementService to access the list of products and favorite state
  public productState = inject(ProductManagementService);

  // Observable of all products
  products$ = this.productState.products$;

  // Define columns to display in the Material table
  displayedColumns: string[] = ['name', 'price', 'description', 'favorite'];

  // MatTableDataSource holds the data for the table and handles sorting, pagination, and filtering
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);

  // References to paginator and sort components
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // FormControl for table filtering input
  filterControl = new FormControl('');

  // Inject Router to navigate to product details
  constructor(private router: Router) { }

  // After the view initializes, set up data subscription, sorting, pagination, and filtering
  ngAfterViewInit() {
    // Subscribe to products observable
    this.products$.subscribe(products => {
      // Update the table data
      this.dataSource.data = products;

      // Connect paginator and sort to the table
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Define a custom filter predicate to filter by name + description
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const combined = (data.name + ' ' + data.description).toLowerCase();
        return combined.includes(filter);
      };
    });

    // Apply filter when filterControl value changes, with a small debounce
    this.filterControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.dataSource.filter = (value || '').trim().toLowerCase();
      });
  }

  // Navigate to the product details page
  openDetails(id: string) {
    this.router.navigate(['/product', id]);
  }

  // Toggle favorite status for a product and stop event propagation to prevent row click
  toggleFavorite(productId: string, event: Event) {
    event.stopPropagation();
    this.productState.toggleFavorite(productId);
  }

  // Apply filter manually from a native input event
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }
}
