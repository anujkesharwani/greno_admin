import { Component } from '@angular/core';
import { TimeSlotService } from './time-slots.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.component.html',
  styleUrls: ['./time-slots.component.scss']
})
export class TimeSlotsComponent {
  timeSlots: any = [];
  constructor(
    private timeSlotService: TimeSlotService,
    public AuthService : AuthService
  ) {
    this.timeSlotService.getSlots().then((slots) => {
      this.timeSlots = slots.docs.map((slot) => {
        return { id: slot.id, ...slot.data() };
      });
      this.timeSlots = this.timeSlots.sort((a: any, b: any) =>
        a.index > b.index ? 1 : -1
      );
    });
  }

  get activeCount() {
    return this.timeSlots.filter((slot: any) => slot.active).length;
  }

  async changeSlotStatus(slotId: string, slotStatus: boolean) {
    await this.timeSlotService.updateSlotStatus(slotId, slotStatus);
    this.timeSlots = this.timeSlots.map((slot: any) => {
      if (slot.id === slotId) {
        slot.active = slotStatus;
      }
      return slot;
    })
  }
}
