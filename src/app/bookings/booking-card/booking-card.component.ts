import { Component, Input } from '@angular/core';
import { Booking } from 'src/app/core/booking.structure';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent {
  @Input({required:true}) booking!:Booking;
}
