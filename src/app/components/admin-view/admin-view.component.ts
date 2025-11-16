import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductManagementService } from '../../services/product-management.service';

@Component({
  selector: 'app-admin-view',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent {

  form: FormGroup;

  private productState = inject(ProductManagementService)

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    description: [''],
  });
  }

  onSubmit() {
    const newProduct = {
      ...this.form.value,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    this.productState.addProduct(newProduct);
    this.form.reset();
  }
}
