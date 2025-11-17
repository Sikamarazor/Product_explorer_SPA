import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  // Check if the current user is an admin
  canActivate(): boolean {
    if (this.userService.isAdmin()) return true;

    // If not admin, redirect to home page
    this.router.navigate(['/home']);

    // Deny access
    return false;
  }
}
