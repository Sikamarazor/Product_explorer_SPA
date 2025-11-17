import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ProductManagementService } from '../../services/product-management.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-addproducts',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.scss'
})
export class AddproductsComponent {
  // Inject required services
  private productService = inject(ProductManagementService); // Handles product CRUD
  private fb = inject(FormBuilder);                          // Form builder for reactive forms
  private snackBar = inject(MatSnackBar);                    // Material snack bar for notifications

  @Input() productToEdit: Product | null = null; // Input property to receive a product for editing
  @Output() saved = new EventEmitter<void>();    // Event emitted when a product is saved

  // Reactive form for adding/editing products
  productForm: FormGroup = this.fb.group({
    id: [''],                                   // Product ID (hidden field, used for editing)
    name: ['', Validators.required],           // Product name (required)
    description: [''],                          // Product description (optional)
    price: [0, Validators.required],           // Product price (required)
    createdAt: ['']                             // Product creation timestamp
  });

  isEditMode = false;  // Flag to distinguish between add and edit mode

  /**
   * Lifecycle hook called when input properties change.
   * If productToEdit is provided, set edit mode and prefill the form.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && this.productToEdit) {
      this.isEditMode = true;
      this.productForm.patchValue(this.productToEdit); // Pre-fill form with product data
    }
  }

  /**
   * Saves the product.
   * If edit mode, updates the product.
   * Otherwise, adds a new product with unique id and creation timestamp.
   */
  saveProduct() {
    if (this.productForm.valid) {
      const product: Product = { ...this.productForm.value };

      if (this.isEditMode) {
        this.productService.updateProduct(product); // Update existing product
      } else {
        product.id = Date.now().toString();        // Assign unique ID
        product.createdAt = Date.now();            // Assign creation timestamp
        this.productService.addProduct(product);   // Add new product
      }

      this.productForm.reset({ price: 0 });       // Reset form after save
      this.isEditMode = false;                    // Reset edit mode flag

      this.showSnackBar("Product added successsfully"); // Notify user

      this.saved.emit();                           // Emit saved event to parent
    }
  }

  /**
   * Shows a Material snack bar notification with a given message.
   * @param message The message to display
   */
  showSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 3000  // Automatically dismiss after 3 seconds
    })
  }
}
