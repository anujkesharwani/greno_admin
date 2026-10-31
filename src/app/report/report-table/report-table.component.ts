import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Data {
  id: string,
  contact: number,
  items: number,
  status: string,
  type: string,
  date: string,
  time: string,
  amount: number
}

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent {
  data: Data[] = [
    {
      id: '#JC13072',
      contact: 9862156600,
      items: 12,
      status: 'Delivered',
      type: 'Wash & Iron',
      date: '12 April 2021',
      time: '12:00 PM',
      amount: 460
    },
    {
      id: '#JC13072',
      contact: 9862156600,
      items: 12,
      status: 'Not Completed Yet',
      type: 'Wash & Iron',
      date: '12 April 2021',
      time: '12:00 PM',
      amount: 460
    },
    {
      id: '#JC13072',
      contact: 9862156600,
      items: 12,
      status: 'Delivered',
      type: 'Wash & Iron',
      date: '12 April 2021',
      time: '12:00 PM',
      amount: 460
    },{
      id: '#JC13072',
      contact: 9862156600,
      items: 12,
      status: 'Delivered',
      type: 'Wash & Iron',
      date: '12 April 2021',
      time: '12:00 PM',
      amount: 460
    },{
      id: '#JC13072',
      contact: 9862156600,
      items: 12,
      status: 'Delivered',
      type: 'Wash & Iron',
      date: '12 April 2021',
      time: '12:00 PM',
      amount: 460
    },{
      id: '#JC13072',
      contact: 9862156600,
      items: 12,
      status: 'Delivered',
      type: 'Wash & Iron',
      date: '12 April 2021',
      time: '12:00 PM',
      amount: 460
    },{
      id: '#JC13072',
      contact: 9862156600,
      items: 12,
      status: 'Delivered',
      type: 'Wash & Iron',
      date: '12 April 2021',
      time: '12:00 PM',
      amount: 460
    },
  ]
}
