import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  displayedColumns: string[] = [
    'Customer',
    'Phone',
    'Total Service',
    'Order/week',
    'Last Bill',
    'Total Bill',
    'Action',
  ];
  data = [
    {
      customer: 'Arun Arora',
      phone: '9566332544',
      service: '2',
      order: '04',
      lastbill: '₹100',
      totalbill: '₹25,000',
    },
    {
      customer: 'Arun Arora',
      phone: '9566332544',
      service: '2',
      order: '04',
      lastbill: '₹100',
      totalbill: '₹25,000',
    },
  ];
}
