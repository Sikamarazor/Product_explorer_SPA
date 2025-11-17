import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductManagementService } from '../../services/product-management.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { AddproductsComponent } from '../addproducts/addproducts.component';
import { ManageproductsComponent } from '../manageproducts/manageproducts.component';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-view',
  imports: [
    CommonModule, MatTabsModule, AddproductsComponent, ManageproductsComponent
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent {
  selectedTab = 0; // default to View Products
  productToEdit$ = new BehaviorSubject<Product | null>(null);

  onEditProduct(product: any) {
    this.productToEdit$.next(product);  // send product to AddProductComponent
    this.selectedTab = 1;               // switch to Add Product tab
  }

  onProductSaved() {
    this.selectedTab = 0;               // switch back to View Products
    this.productToEdit$.next(null);     // reset
  }

}
