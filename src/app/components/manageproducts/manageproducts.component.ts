import { Component, ViewChild, AfterViewInit, inject, EventEmitter, Output } from '@angular/core';
import { ProductManagementService } from '../../services/product-management.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-manageproducts',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './manageproducts.component.html',
  styleUrl: './manageproducts.component.scss'
})
export class ManageproductsComponent implements AfterViewInit {
  // Inject the ProductManagementService to access and manage products
  productService = inject(ProductManagementService);

  // EventEmitter to notify parent component when a product should be edited
  @Output() edit = new EventEmitter<Product>();

  // Define the columns for the Material table
  displayedColumns: string[] = ['name', 'price', 'description', 'actions'];

  // MatTableDataSource holds the table data and supports sorting, pagination, and filtering
  dataSource = new MatTableDataSource<Product>([]);

  // FormControl for the filter input field
  filterControl = new FormControl('');

  // References to paginator and sort components
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Lifecycle hook: after the view initializes
  ngAfterViewInit() {
    // Subscribe to the product list from the service
    this.productService.products$.subscribe(products => {
      // Update the table's data source
      this.dataSource.data = products;

      // Attach paginator and sort to the data source
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // Subscribe to filter input changes with debounce
    this.filterControl.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      // Apply filter text to the data source
      this.dataSource.filter = (value || '').trim().toLowerCase();

      // Define custom filter predicate to filter by name + description
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const combined = (data.name + ' ' + data.description).toLowerCase();
        return combined.includes(filter);
      };
    });
  }

  // Emit the product to parent component when editing is requested
  editProduct(product: Product) {
    this.edit.emit(product); // Notify parent component
  }

  // Delete a product by its ID using the service
  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }
}
