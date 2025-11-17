import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddproductsComponent } from './addproducts.component';
import { ProductManagementService } from '../../services/product-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { Product } from '../../models/product.model';
import { of } from 'rxjs';

describe('AddproductsComponent', () => {
  let component: AddproductsComponent;
  let fixture: ComponentFixture<AddproductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductManagementService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test description',
    price: 100,
    createdAt: Date.now()
  };

  beforeEach(async () => {
    const productSpy = jasmine.createSpyObj('ProductManagementService', ['addProduct', 'updateProduct']);
    const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        AddproductsComponent,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: ProductManagementService, useValue: productSpy },
        { provide: MatSnackBar, useValue: snackSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddproductsComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductManagementService) as jasmine.SpyObj<ProductManagementService>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable save button if form is invalid', () => {
    component.productForm.setValue({
      id: '',
      name: '',
      description: '',
      price: 0,
      createdAt: ''
    });
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should prefill form when productToEdit is set', () => {
    component.productToEdit = mockProduct;
    component.ngOnChanges({ productToEdit: { currentValue: mockProduct, previousValue: null, firstChange: true, isFirstChange: () => true } });
    fixture.detectChanges();

    expect(component.productForm.value.name).toBe('Test Product');
    expect(component.productForm.value.price).toBe(100);
    expect(component.isEditMode).toBeTrue();
  });
});
