import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import { UserSelectionTypeComponent } from './components/modals/user-selection-type/user-selection-type.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private dialog: MatDialog, public userService: UserService) {
    console.log('User  type ', this.userService.getUserType());
    if (!this.userService.getUserType()) {
      this.dialog.open(UserSelectionTypeComponent, { disableClose: true });
    }
  }

  // Logout and clear the user type
  logout() {
    localStorage.removeItem('userType');
  }
}
