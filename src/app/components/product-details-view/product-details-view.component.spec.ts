import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsViewComponent } from './product-details-view.component';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductManagementService } from '../../services/product-management.service';
import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

describe('ProductDetailsViewComponent', () => {
  let component: ProductDetailsViewComponent;
  let fixture: ComponentFixture<ProductDetailsViewComponent>;

  let productStateMock: any;
  let routerMock: jasmine.SpyObj<Router>;
  let productsSubject: BehaviorSubject<Product[]>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'A product for testing',
    price: 999,
    createdAt: Date.now()
  };

  beforeEach(async () => {
    productsSubject = new BehaviorSubject<Product[]>([mockProduct]);

    productStateMock = {
      products$: productsSubject.asObservable(),
      toggleFavorite: jasmine.createSpy('toggleFavorite'),
      isFavorite: jasmine.createSpy('isFavorite').and.returnValue(false)
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ProductDetailsViewComponent,
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }),
            snapshot: {
              paramMap: { get: () => '1' }
            }
          }
        },
        { provide: ProductManagementService, useValue: productStateMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the product from products$ using the route param', () => {
    expect(component.product?.id).toBe('1');
    expect(component.product?.name).toBe('Test Product');
  });

  it('should display the product name', () => {
    const title = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(title.textContent).toContain('Test Product');
  });

  it('should display the product description', () => {
    const content = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement;
    expect(content.textContent).toContain('A product for testing');
  });

  it('should navigate back when back button is clicked', () => {
    const backButton = fixture.debugElement.query(By.css('button[mat-button]')).nativeElement;
    backButton.click();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should call toggleFavorite when clicking the favorite button', () => {
    const favButton = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    favButton.click();

    expect(productStateMock.toggleFavorite).toHaveBeenCalledWith('1');
  });
});