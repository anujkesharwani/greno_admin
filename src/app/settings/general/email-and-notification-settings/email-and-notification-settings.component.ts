import { Component } from '@angular/core';

@Component({
  selector: 'app-email-and-notification-settings',
  templateUrl: './email-and-notification-settings.component.html',
  styleUrls: ['./email-and-notification-settings.component.scss']
})
export class EmailAndNotificationSettingsComponent {
  data = [
    {name:'Message Notification',tick:false},
    {name:'Booking Notification',tick:true},
    {name:'Agent Updates',tick:false},
    {name:'New User Registrations',tick:false},
    {name:'Feedback and Testimonials',tick:true},
    {name:'Appointment Cancellations',tick:false},
  ];
}
