import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUserModalComponent } from './create-user-modal/create-user-modal.component';

@Component({
  selector: 'app-users-permission-catalogue',
  templateUrl: './users-permission-catalogue.component.html',
  styleUrls: ['./users-permission-catalogue.component.scss'],
})
export class UsersPermissionCatalogueComponent {
  managerCount: number = 2;
  accountantCount: number = 5;
  operatorCount: number = 3;
  customeUserCount: number = 2;

  constructor(public dialog: MatDialog) {}

  opencCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {});
  }
}
