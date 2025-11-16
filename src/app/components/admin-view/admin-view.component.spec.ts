import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewComponent } from './admin-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { ProductManagementService } from '../../services/product-management.service';

describe('AdminViewComponent', () => {
  let component: AdminViewComponent;
  let fixture: ComponentFixture<AdminViewComponent>;
  let service: ProductManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewComponent,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [ProductManagementService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductManagementService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a product via form', () => {
    const form = component.form;
    form.controls['name'].setValue('New Product');
    form.controls['price'].setValue(123);
    form.controls['description'].setValue('Test desc');

    expect(form.valid).toBeTrue();

    // Spy on service
    spyOn(service, 'addProduct').and.callThrough();

    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    button.nativeElement.click();

    fixture.detectChanges();

    expect(service.addProduct).toHaveBeenCalled();
    const added = service.currentProducts.find(p => p.name === 'New Product');
    expect(added).toBeTruthy();
    expect(added!.price).toBe(123);
  });

  it('should reset the form after submit', () => {
    component.form.controls['name'].setValue('Test');
    component.form.controls['price'].setValue(50);
    component.onSubmit();

    expect(component.form.value.name).toBeNull();
    expect(component.form.value.price).toBeNull();
  });

  it('should disable submit button when form invalid', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['price'].setValue(null);

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(button.nativeElement.disabled).toBeTrue();
  });
});
