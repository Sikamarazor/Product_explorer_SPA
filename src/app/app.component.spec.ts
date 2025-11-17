import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('AppComponent (standalone)', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    dialogMock = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    userServiceMock = jasmine.createSpyObj('UserService', ['getUserType']);
    userServiceMock.getUserType.and.returnValue('admin'); // set default user type

    await TestBed.configureTestingModule({
      imports: [AppComponent, MatToolbarModule, MatButtonModule, NgIf],
      providers: [
        { provide: MatDialog, useValue: dialogMock },
        { provide: UserService, useValue: userServiceMock },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog if user type not set', () => {
    userServiceMock.getUserType.and.returnValue(null);
    const localFixture = TestBed.createComponent(AppComponent);
    localFixture.detectChanges();
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should remove user type on logout', () => {
    spyOn(localStorage, 'removeItem');
    component.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('userType');
  });
});
