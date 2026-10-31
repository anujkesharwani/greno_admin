import { Component } from '@angular/core';

@Component({
  selector: 'app-appliance-repair-discounts',
  templateUrl: './appliance-repair-discounts.component.html',
  styleUrls: ['./appliance-repair-discounts.component.scss']
})
export class ApplianceRepairDiscountsComponent {

  data = [
    {
      date: '1 jul 2023',
      day: 'Sunday',
      status: 'Present',
      value: ['-', '50%', '-', '-', '-']
    },
    {
      date: '2 jul 2023',
      day: 'Monday',
      status: 'Absent',
      value: ['-', '-', '15%', '-', '-']
    },
    {
      date: '3 jul 2023',
      day: 'Wednesday',
      status: 'Present',
      value: ['-', '-', '-', '-', '-']
    },
    {
      date: '4 jul 2023',
      day: 'Thrusday',
      status: 'Present',
      value: ['-', '-', '-', '2%', '-']
    },
    {
      date: '5 jul 2023',
      day: 'Friday',
      status: 'Present',
      value: ['-', '-', '11%', '9%', '-']
    },
    {
      date: '6 jul 2023',
      day: 'Saturday',
      status: 'Present',
      value: ['-', '11%', '12%', '-', '-']
    },
  ];
}
