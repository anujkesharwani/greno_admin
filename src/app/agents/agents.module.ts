import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsComponent } from './agents.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { CountUpDirective } from './counter.directive';
import { HistoryDialogComponent } from './history-dialog/history-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AgentsComponent,
    CountUpDirective,
    HistoryDialogComponent
  ],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    GoogleMapsModule,
    MatTabsModule,
    MatExpansionModule
  ],
  providers:[CurrencyPipe,DecimalPipe]
})
export class AgentsModule { }
