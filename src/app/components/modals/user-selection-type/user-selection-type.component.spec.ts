import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSelectionTypeComponent } from './user-selection-type.component';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('UserSelectionTypeComponent', () => {
  let component: UserSelectionTypeComponent;
  let fixture: ComponentFixture<UserSelectionTypeComponent>;
  let userService: UserService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll']);
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, UserSelectionTypeComponent],
      providers: [
        UserService,
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSelectionTypeComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UserService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set user type to admin and close the dialog', () => {
    spyOn(userService, 'setUserType');
    component.select('admin');
    expect(userService.setUserType).toHaveBeenCalledWith('admin');
    expect(dialogSpy.closeAll).toHaveBeenCalled();
  });

  it('should set user type to user and close the dialog', () => {
    spyOn(userService, 'setUserType');
    component.select('user');
    expect(userService.setUserType).toHaveBeenCalledWith('user');
    expect(dialogSpy.closeAll).toHaveBeenCalled();
  });
});
