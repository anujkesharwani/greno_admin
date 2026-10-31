import { Component } from '@angular/core';

@Component({
  selector: 'app-day-time-management',
  templateUrl: './day-time-management.component.html',
  styleUrls: ['./day-time-management.component.scss']
})
export class DayTimeManagementComponent {
  data = [
    {
      day: 'Sunday',
      timings: [
        '08:00 AM - 10:00 AM ',
        '012:00 PM - 02:00 PM ',
        '012:00 PM - 02:00 PM',
        '012:00 PM - 02:00 PM ',
        '012:00 PM - 02:00 PM',
      ]
    },
    {
      day: 'Monday',
      timings: [
        '08:00 AM - 10:00 AM',
        '012:00 PM - 02:00 PM ',
        '012:00 PM - 02:00 PM',
        '012:00 PM - 02:00 PM ',
        '012:00 PM - 02:00 PM',
      ]
    },
    {
      day: 'Tuesday',
      timings: [
        '08:00 AM - 10:00 AM',
        '012:00 PM - 02:00 PM ',
        '012:00 PM - 02:00 PM',
        '012:00 PM - 02:00 PM ',
        '012:00 PM - 02:00 PM',
      ]
    },
    {
      day: 'Wednesday',
      timings: [
        '08:00 AM - 10:00 AM',
        '012:00 PM - 02:00 PM ',
        '012:00 PM - 02:00 PM',
        '012:00 PM - 02:00 PM ',
        '012:00 PM - 02:00 PM',
      ]
    },
  ]
}
