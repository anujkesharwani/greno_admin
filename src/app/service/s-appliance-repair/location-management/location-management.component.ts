import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressDialogComponent } from 'src/app/dialog/add-address-dialog/add-address-dialog.component';

@Component({
  selector: 'app-location-management',
  templateUrl: './location-management.component.html',
  styleUrls: ['./location-management.component.scss']
})
export class LocationManagementComponent {
  data = [
    {
      h1: '3/203 AVAS VIKAS',
      h2: 'ALLAHABAD Allahabad UP 211019 IN',
    },
    {
      h1: '3/203 AVAS VIKAS',
      h2: 'ALLAHABAD Allahabad UP 211019 IN',
    },
    {
      h1: '3/203 AVAS VIKAS',
      h2: 'ALLAHABAD Allahabad UP 211019 IN',
    },
    {
      h1: '3/203 AVAS VIKAS',
      h2: 'ALLAHABAD Allahabad UP 211019 IN',
    },
  ]

  constructor(
    private dialog: MatDialog
  ) { }

  openAddAddressDialog() {
    const dialogRef = this.dialog.open(AddAddressDialogComponent);
  }
}
