import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-category-dialog',
  templateUrl: './add-new-category-dialog.component.html',
  styleUrls: ['./add-new-category-dialog.component.scss']
})
export class AddNewCategoryDialogComponent {

  constructor(
    public dialogRef:MatDialogRef<AddNewCategoryDialogComponent>,
  ){}

  closeDialog(){
    this.dialogRef.close();
  }
}
