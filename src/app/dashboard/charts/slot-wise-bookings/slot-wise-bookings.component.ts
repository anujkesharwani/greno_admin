import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';
import { BookingService } from 'src/app/core/booking.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

// Register the necessary components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

@Component({
  selector: 'app-slot-wise-bookings',
  templateUrl: './slot-wise-bookings.component.html',
  styleUrls: ['./slot-wise-bookings.component.scss'],
})
export class SlotWiseBookingsComponent implements OnInit {
  constructor(private bookingService: BookingService,public AuthService:AuthService) {}
  startDate1!:Date;
  endDate1!: Date;
  fromDate1: any = '';
  toDate1: any = '';
  private myChart: any;

  timeSlot: { [key: string]: { [key: string]: number } } = {};
  dates: string[] = [];

  async ngOnInit() {
    const currentDate = new Date();
    this.startDate1 = new Date(currentDate);
    this. endDate1 = new Date();
    this.startDate1.setDate(currentDate.getDate() - 6); // Set start date to 6 days before today
    this.onDateChange(); // Load data based on the initial date range
  
   }

  onDateChange() {
    if (this.startDate1 && this.endDate1) {
    this.fromDate1 = this.convertToYYYYMMDD(this.startDate1.toString());
    this.toDate1 = this.convertToYYYYMMDD(this.endDate1.toString());
    // this.getBooking(this.fromDate1, this.toDate1);
    this.timeSlot = {};
    this.fetchBookingData(this.fromDate1, this.toDate1);
  }
  }
 convertToYYYYMMDD(dateString: string): string | null {
    const inputDate = new Date(dateString);

    if (isNaN(inputDate.getTime())) {
      // Handle invalid date string
      return null;
    }

    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2); // Month is 0-based
    const day = ('0' + inputDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
  monthAbbreviation(monthIndex: number): string {
    const monthsAbbreviation = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthsAbbreviation[monthIndex];
  }

  formatAMPM(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

 
  private async fetchBookingData(fromDate: string, toDate: string) {




    const startDate = fromDate; // Replace with your start date
    const endDate = toDate; // Replace with your end date
    const result = await this.bookingService.getBookingBySlot(
      startDate,
      endDate
    );
    result.forEach((booking) => {
      const date = new Date(booking.timeSlot?.date?.seconds * 1000);
      const formattedDate = `${date.getUTCDate()} ${this.monthAbbreviation(
        date.getUTCMonth()
      )}`;
      const timeRange = `${this.formatAMPM(
        booking.timeSlot?.time?.startTime?.seconds * 1000)} - ${this.formatAMPM(booking.timeSlot?.time?.endTime?.seconds * 1000)}`;
      if (!this.timeSlot[formattedDate]) {
        this.timeSlot[formattedDate] = {
          '5:30 AM - 7:30 AM': 0,
          '7:30 AM - 9:30 AM': 0,
          '9:30 AM - 11:30 AM': 0,
          '11:30 AM - 1:30 PM': 0,
          '1:30 PM - 3:30 PM': 0,
          '3:30 PM - 5:30 PM': 0,
          '5:30 PM - 7:30 PM': 0,
          '7:30 PM - 9:30 PM': 0,
          '9:30 PM - 11:30 PM': 0,
          '11:30 PM - 1:30 AM': 0,
          '1:30 AM - 3:30 AM': 0,
          '3:30 AM - 5:30 AM': 0,
        };
      }
      this.timeSlot[formattedDate][timeRange] += 1;
    });
    this.processTimeSlots();
    this.generateChart();
  }

  private loadChart(labels:any,datasets:any) {
    if (this.myChart) {
      this.destroyChart();
    }
   this.myChart= new Chart('slotWiseBookings', {
      type: 'line', // this denotes the type of chart
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
  private destroyChart() {
    if (this.myChart) {
      this.myChart.destroy();
      this.myChart = null;
    }
  }
  private processTimeSlots() {
    this.dates = [
      '5:30 AM - 7:30 AM',
      '7:30 AM - 9:30 AM',
      '3:30 PM - 5:30 PM',
      '5:30 PM - 7:30 PM',
      '7:30 PM - 9:30 PM',
      '9:30 PM - 11:30 PM',
      '11:30 PM - 1:30 AM',
      '1:30 AM - 3:30 AM',
      '3:30 AM - 5:30 AM',
    ]; // Assuming all dates have the same time slots
  }

  private generateChart() {
    const labels = this.dates;

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    const datasets = Object.keys(this.timeSlot).map((date) => {
      const data = labels.map((slot) => this.timeSlot[date][slot] || 0);
      return {
        label: date,
        data: data,
        borderColor: getRandomColor(),
      };
    });
    this.loadChart(labels,datasets);

  }
}
