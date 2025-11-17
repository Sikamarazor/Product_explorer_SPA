import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ManageproductsComponent } from './manageproducts.component';
import { ProductManagementService } from '../../services/product-management.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

describe('ManageproductsComponent', () => {
  let component: ManageproductsComponent;
  let fixture: ComponentFixture<ManageproductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductManagementService>;

  const mockProduct1: Product = { id: '1', name: 'Product 1', price: 100, description: 'Desc 1', createdAt: Date.now() };
  const mockProduct2: Product = { id: '2', name: 'Product 2', price: 200, description: 'Desc 2', createdAt: Date.now() };

  let productsSubject: BehaviorSubject<Product[]>;

  beforeEach(async () => {
    productsSubject = new BehaviorSubject<Product[]>([mockProduct1, mockProduct2]);

    const spy = jasmine.createSpyObj('ProductManagementService', ['deleteProduct'], { products$: productsSubject.asObservable() });

    await TestBed.configureTestingModule({
      imports: [
        ManageproductsComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ProductManagementService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageproductsComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductManagementService) as jasmine.SpyObj<ProductManagementService>;
    fixture.detectChanges();

    // Set paginator and sort manually since ViewChild isn't populated in tests
    component.paginator = { pageSize: 10, pageIndex: 0, length: 2, firstPage: () => {}, lastPage: () => {}, nextPage: () => {}, previousPage: () => {}, hasNextPage: () => false, hasPreviousPage: () => false, page: null as any } as any;
    component.sort = {} as any;

    component.ngAfterViewInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the table with products', () => {
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should emit edit event when edit button clicked', () => {
    spyOn(component.edit, 'emit');

    const firstEditBtn = fixture.debugElement.queryAll(By.css('button'))[0];
    firstEditBtn.triggerEventHandler('click', null);

    expect(component.edit.emit).toHaveBeenCalledWith(mockProduct1);
  });

  it('should call deleteProduct on service when delete button clicked', () => {
    const deleteBtn = fixture.debugElement.queryAll(By.css('button'))[1];
    deleteBtn.triggerEventHandler('click', null);

    expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith(mockProduct1.id);
  });
});
