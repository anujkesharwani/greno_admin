import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CountUpDirective } from './counter.directive';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatTabsModule } from '@angular/material/tabs';
import { HistoryDialogComponent } from './history-dialog/history-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    CustomersComponent,
    CountUpDirective,
    HistoryDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    GoogleMapsModule,
    MatTabsModule,
    MatExpansionModule
  ],
  providers:[CurrencyPipe,DecimalPipe]
})
export class CustomersModule { }
