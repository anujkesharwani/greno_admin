import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Booking } from '../booking.structure';
import { ExcelService } from '../excel.service';
import { ReportsService } from '../reports.service';
import { PdfService } from '../pdf.service';
import { Firestore } from '@angular/fire/firestore';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { DataProviderService } from 'src/app/core/data-provider.service';
export interface Summary {
  id: string | number;
  name: string;
  discount: number;
  taxes: number;
  bookings: number;
  bookingsCancelled: number;
  availableAgents: number;
  totalRatings: number;
}

export interface TimeSlot {
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-slot-wise-summary',
  templateUrl: './slot-wise-summary.component.html',
  styleUrls: ['./slot-wise-summary.component.scss'],
  providers: [DatePipe]
})
export class SlotWiseSummaryComponent implements OnInit {
  refreshedAt: string = '';
  dateSelected: Date = new Date();
  today: Date = new Date();
  bookings: Booking[] | any;
  customerSummary: any[] = []

  isLoading: boolean = false;
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  summary: Summary = {
    id: '',
    name: '',
    discount: 0,
    taxes: 0,
    bookings: 0,
    bookingsCancelled: 0,
    availableAgents: 0,
    totalRatings: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<SlotWiseSummaryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { dateSelected: Date },
    private excelService: ExcelService,
    private pdfService: PdfService,
    private ReportsService: ReportsService,
    private firestore: Firestore,
    public dataProvider: DataProviderService,//copy this
    public AuthService: AuthService,//copy this
  ) { }

  ngOnInit(): void {
    this.dateSelected = this.data.dateSelected;
    this.refresh();
  }

  refresh(): void {
    this.isLoading = true;
    this.refreshedAt = 'Refreshing...';
    this.loadSummary().then(() => {
      this.refreshedAt = 'Data loaded at ' + new Date().toLocaleTimeString();
      this.isLoading = false;
    });
  }

  formatAMPM(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  allowedCities: any []

  async getUsersBoooking() {
    const selectedDate = new Date(this.dateSelected);
    selectedDate.setHours(0, 0, 0, 0);
    const startTimeStamp = selectedDate.getTime();

    selectedDate.setHours(23, 59, 59, 999);
    const endTimeStamp = selectedDate.getTime();
    const allowedCities = await this.AuthService.getAllowedCities();
      
    this.allowedCities = allowedCities.map((city:any) => city.cityId);
    this.customerSummary = [];
    const processedBookings = new Set<string>();
    // const resultArray: { id: string; timeSlot: any; time: any }[] = [];
    const time_slots = ['7:00 AM-9:00 AM', '9:00 AM-11:00 AM', '11:00 AM-1:00 PM', '1:00 PM-3:00 PM', '3:00 PM-5:00 PM', '5:00 PM-7:00 PM', '7:00 PM-9:00 PM'];

    for (let i = 0; i < time_slots.length; i++) {
      this.customerSummary.push({
        slotName: time_slots[i],
        taxes: 0,
        totalBooking: 0,
        sales: 0,
        discarded: 0,
        completed: 0,
        totalDiscount: 0
      });
    }

    function timeSlotStringToTimestamp(timeSlot: string, baseDate: Date) {
      const [startTime, endTime] = timeSlot.split('-');
      const startDate = new Date(baseDate.toDateString() + ' ' + startTime);
      const endDate = new Date(baseDate.toDateString() + ' ' + endTime);

      const startTimestamp = startDate.getTime();
      const endTimestamp = endDate.getTime();

      return { start: startTimestamp, end: endTimestamp };
    }
    const timeSlotTimestamps = time_slots.map(slot => timeSlotStringToTimestamp(slot, selectedDate));
    await this.ReportsService.getDaySummaryy().then((users: any) => {
      users.docs.forEach((user: any) => {
        getDocs(collection(this.firestore, 'users', user.id, 'bookings')).then((bookings) => {
          bookings.docs.forEach((booking: any) => {
            const bookingData = booking.data();
            // const createdAtTimestamp = bookingData.createdAt.toDate().getTime();
            const bookingDate = bookingData['timeSlot']['date'].toDate().getTime();
            // const BookingTimeStamp = new Date(bookingDate).getTime();
            let validBooking=false;  
        if ( this.dataProvider.cityId == bookingData?.["address"].cityId  ){
            validBooking=true;
          
        }
        else if(this.dataProvider.cityId=="all"){
          this.allowedCities.map((cid:any)=>{
            if(cid==bookingData?.["address"].cityId){
              validBooking=true;
            }
          })
        }
            if (bookingDate >= startTimeStamp && bookingDate <= endTimeStamp && validBooking==true) {

              // if (createdAtTimestamp >= startTimeStamp && createdAtTimestamp <= endTimeStamp) {
              const startTime = new Date(bookingData['timeSlot']['time']['startTime'].toDate()).getTime();
              const endTime = new Date(bookingData['timeSlot']['time']['endTime'].toDate()).getTime();
              timeSlotTimestamps.forEach((slot, index) => {
                if (startTime >= slot.start && endTime <= slot.end) {
                  const slotSummary = this.customerSummary[index];

                  slotSummary.taxes += Math.round(bookingData?.['billing'].tax || 0);
                  slotSummary.totalBooking++;
                  slotSummary.sales += Math.round(bookingData?.['billing'].grandTotal || 0);
                  slotSummary.totalDiscount += Math.round(bookingData?.['billing'].discount || 0);
                  // slotSummary.completed +=slotSummary.completed

                  switch (bookingData['stage']) {
                    case 'completed':
                      slotSummary.completed++;
                      break;
                    case 'discarded':
                      slotSummary.discarded++;
                      break;
                  }
                }
              });
            }
          });
        });
      });
    });

    // console.log("Customer Summary: ", this.customerSummary);?
  }




  private async loadSummary() {
    await this.getUsersBoooking();
  }

  downloadExcel() {
    const summaryData = this.summaryArr;

    if (summaryData.length === 0) {
      console.warn('No summary data available to export.');
      return;
    }

    this.excelService.export(summaryData, 'Summary for ' + this.dateSelectedStr);
  }

  downloadPDF() {
    const summaryData = this.summaryArr;

    if (summaryData.length === 0) {
      console.warn('No summary data available to export.');
      return;
    }

    this.pdfService.export(summaryData, 'Summary for ' + this.dateSelectedStr);
  }

  private get summaryArr() {
    if (!this.summary) {
      console.warn('Summary is not available.');
      return [];
    }

    return Object.entries(this.summary).map(([key, value]) => {
      if (['sales', 'discount', 'taxes', 'jobAcceptanceCharge', 'cancelledAmount'].includes(key)) {
        value = 'Rs. ' + value;
      }
      return {
        key: this.camelCaseToTitleCase(key),
        value,
      };
    });
  }

  private camelCaseToTitleCase(str: string): string {
    const spacedString = str.replace(/([A-Z])/g, ' $1');
    return spacedString.charAt(0).toUpperCase() + spacedString.slice(1).toLowerCase();
  }

  private get dateSelectedStr(): string {
    return this.dateSelected.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
