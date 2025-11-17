import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ProductManagementService } from '../../services/product-management.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent (Catalog Table)', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let productServiceMock: any;
  let routerMock: any;

  const mockProducts: Product[] = [
    { id: '1', name: 'Product 1', description: 'Desc 1', price: 100, createdAt: Date.now() },
    { id: '2', name: 'Product 2', description: 'Desc 2', price: 200, createdAt: Date.now() },
  ];

  let productsSubject: BehaviorSubject<Product[]>;

  beforeEach(async () => {
    productsSubject = new BehaviorSubject<Product[]>(mockProducts);

    productServiceMock = {
      products$: productsSubject.asObservable(),
      toggleFavorite: jasmine.createSpy('toggleFavorite'),
      isFavorite: jasmine.createSpy('isFavorite').and.returnValue(false)
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ProductManagementService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No products added" when list is empty', () => {
    productsSubject.next([]);
    fixture.detectChanges();

    const emptyEl = fixture.debugElement.query(By.css('.empty'));
    expect(emptyEl.nativeElement.textContent).toContain('No products added');

    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeNull();
  });

  it('should call toggleFavorite when favorite button clicked', () => {
    fixture.detectChanges();
    const favButton = fixture.debugElement.query(By.css('button[mat-icon-button]'));
    favButton.triggerEventHandler('click', new Event('click'));

    expect(productServiceMock.toggleFavorite).toHaveBeenCalledWith('1');
  });

});
