import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  @Input() totalSales:number = 0;
  @Input() totalDiscounts:number = 0;
  @Input() averageBills:number = 0;
  @Input() availableAgents:number = 0;
  @Input() pendingBookings:number = 0;
  @Input() rejectedBookings:number = 0;
  @Input() inProgressBookings:number = 0;

  constructor (public AuthService:AuthService){}
}
