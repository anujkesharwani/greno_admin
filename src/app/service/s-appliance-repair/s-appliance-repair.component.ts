import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewCategoryDialogComponent } from 'src/app/dialog/add-new-category-dialog/add-new-category-dialog.component';

@Component({
  selector: 'app-s-appliance-repair',
  templateUrl: './s-appliance-repair.component.html',
  styleUrls: ['./s-appliance-repair.component.scss']
})
export class SApplianceRepairComponent {

  constructor(
    private dialog: MatDialog
  ) { }

  openAddNewCategoryDialog() {
    const dialogRef = this.dialog.open(AddNewCategoryDialogComponent);
  }
}
