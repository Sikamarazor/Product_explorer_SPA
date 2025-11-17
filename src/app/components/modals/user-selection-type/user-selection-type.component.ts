import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-selection-type',
  imports: [
    MatButtonModule
  ],
  templateUrl: './user-selection-type.component.html',
  styleUrl: './user-selection-type.component.scss'
})
export class UserSelectionTypeComponent {
  
  constructor(private userService: UserService, private dialog: MatDialog) {}

  // Select the user type
  select(type: 'admin' | 'user') {
    this.userService.setUserType(type);
    this.dialog.closeAll();
  }
}
