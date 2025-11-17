import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USER_TYPE_KEY = 'userType';

  //  Stores the selected user type ('admin' or 'user') in localStorage.
  setUserType(type: 'admin' | 'user') {
    // Store the selected user type in localStorage
    localStorage.setItem(this.USER_TYPE_KEY, type);
  }

  // Retrieves the current user type from localStorage. 
  getUserType(): 'admin' | 'user' | null {
    // Retrieve the user type from localStorage, return as 'admin', 'user', or null
    return localStorage.getItem(this.USER_TYPE_KEY) as 'admin' | 'user' | null;
  }

  // Check if the current user type is 'admin'
  isAdmin(): boolean {
    return this.getUserType() === 'admin';
  }

}
