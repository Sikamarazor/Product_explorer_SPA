import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);

    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get user type as admin', () => {
    service.setUserType('admin');
    const type = service.getUserType();
    expect(type).toBe('admin');
  });

  it('should set and get user type as user', () => {
    service.setUserType('user');
    const type = service.getUserType();
    expect(type).toBe('user');
  });

  it('should return null if no user type is set', () => {
    const type = service.getUserType();
    expect(type).toBeNull();
  });

  it('should return true for isAdmin when user type is admin', () => {
    service.setUserType('admin');
    expect(service.isAdmin()).toBeTrue();
  });

  it('should return false for isAdmin when user type is user', () => {
    service.setUserType('user');
    expect(service.isAdmin()).toBeFalse();
  });

  it('should return false for isAdmin if user type is not set', () => {
    expect(service.isAdmin()).toBeFalse();
  });
});
