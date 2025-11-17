import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

describe('AuthGuardService', () => {
  let guard: AuthGuardService;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userSpy = jasmine.createSpyObj('UserService', ['isAdmin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: UserService, useValue: userSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuardService);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is admin', () => {
    userService.isAdmin.and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should prevent activation and navigate to /home if user is not admin', () => {
    userService.isAdmin.and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
