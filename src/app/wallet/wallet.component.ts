import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddMoneyToWalletDialogComponent } from '../dialog/add-money-to-wallet-dialog/add-money-to-wallet-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  card: number[] = [1, 2];
  tab: number[] = [1, 2, 3, 4, 5, 6];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog:MatDialog
  ) { }

  detailsNavigate() {
    this.router.navigate(['/transaction-details']);
  }

  openAddMoneyToWalletDialog(){
    this.dialog.open(AddMoneyToWalletDialogComponent);
  }
}
