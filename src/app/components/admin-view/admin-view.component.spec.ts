import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminViewComponent } from './admin-view.component';
import { AddproductsComponent } from '../addproducts/addproducts.component';
import { ManageproductsComponent } from '../manageproducts/manageproducts.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

describe('AdminViewComponent', () => {
  let component: AdminViewComponent;
  let fixture: ComponentFixture<AdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminViewComponent,
        AddproductsComponent,
        ManageproductsComponent,
        MatTabsModule,
        CommonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the admin view component', () => {
    expect(component).toBeTruthy();
  });

  it('should default to View Products tab', () => {
    expect(component.selectedTab).toBe(0);
  });

  it('should switch to Add Product tab and set productToEdit$ when onEditProduct is called', () => {
    const mockProduct: Product = { id: '1', name: 'Test', price: 100, description: 'Desc', createdAt: Date.now() };

    component.onEditProduct(mockProduct);

    component.productToEdit$.subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    expect(component.selectedTab).toBe(1);
  });

  it('should reset productToEdit$ and switch back to View Products tab onProductSaved', () => {
    component.selectedTab = 1;
    component.productToEdit$.next({ id: '1', name: 'Test', price: 100, description: 'Desc', createdAt: Date.now() });

    component.onProductSaved();

    component.productToEdit$.subscribe(product => {
      expect(product).toBeNull();
    });

    expect(component.selectedTab).toBe(0);
  });

});
