import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PolicyDialogComponent } from 'src/app/dialog/policy-dialog/policy-dialog.component';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent {
  p1: string = 'Terms & Conditions';
  p2: string = 'Privacy Policy';

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog() {
    this.dialog.open(PolicyDialogComponent)
  }
}
