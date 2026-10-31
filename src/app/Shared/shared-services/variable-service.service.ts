import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class VariableService {
  constructor() {}
  stageMaster:any = {
    'pending': {
      'text' : 'Allotment Pending',
      'gradient' : 'sky-blue-gradient',
      'color' : 'sky-blue-background'
    },
    'assigned': {
        'text' : 'Acceptance Pending',
        'gradient' : 'blue-gradient',
        'color' : 'blue-background'
    },
    'unassigned': {
      'text' : 'OTP Verification',
      'gradient' : 'light-blue-gradient',
      'color' : 'light-blue-background'
    },
    
    'started' : {
      'text' : 'In progress',
      'gradient' : 'yellow-gradient',
      'color' : 'yellow-background'
    },
    'completed': {
      'text' : 'Completed',
      'gradient' : 'green-gradient',
      'color' : 'green-background'
    },
    'rejected': {
        'text' : 'Rejected',
        'gradient' : 'red-gradient',
        'color' : 'red-background'
    },
    'expired': {
      'text' : 'Expired',
      'gradient' : 'grey-gradient',
      'color' : 'grey-background'
    }
  }
  timeSlotMaster:any = {
    '7' : 0,
    '9' : 1,
    '11' : 2,
    '13' : 3,
    '15' : 4,
    '17' : 5,
    '19' : 6
  }
}
