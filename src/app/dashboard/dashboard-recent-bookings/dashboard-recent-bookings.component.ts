import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-recent-bookings',
  templateUrl: './dashboard-recent-bookings.component.html',
  styleUrls: ['./dashboard-recent-bookings.component.scss']
})
export class DashboardRecentBookingsComponent {
  @Input() data:{
    id:string,
    name:string,
    address:string,
    service:string
  }[] = [
    {
      id: '#JC125-3326',
      name: 'Raviraj Chavda',
      address: '4140 Parker Rd. Allentown, New Mexico 31134',
      service:'Service : 02'
    },{
      id: '#JC125-3326',
      name: 'Raviraj Chavda',
      address: '4140 Parker Rd. Allentown, New Mexico 31134',
      service:'Service : 02'
    },{
      id: '#JC125-3326',
      name: 'Raviraj Chavda',
      address: '4140 Parker Rd. Allentown, New Mexico 31134',
      service:'Service : 02'
    },{
      id: '#JC125-3326',
      name: 'Raviraj Chavda',
      address: '4140 Parker Rd. Allentown, New Mexico 31134',
      service:'Service : 02'
    },
  ]
}
