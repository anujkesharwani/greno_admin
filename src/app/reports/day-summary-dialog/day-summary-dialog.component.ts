import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExcelService } from '../excel.service';
import { PdfService } from '../pdf.service';
import { DaySummary } from '../summary.structure';
import { ReportsService } from '../reports.service';
import { LoaderService } from 'src/app/Shared/shared-services/loader.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { DataProviderService } from 'src/app/core/data-provider.service';
@Component({
  selector: 'app-day-summary-dialog',
  templateUrl: './day-summary-dialog.component.html',
  styleUrls: ['./day-summary-dialog.component.scss'],
})
export class DaySummaryDialogComponent implements OnInit {
  refreshedAt: string = '';
  dateSelected: Date = new Date();
  today: Date = new Date();
  summary: DaySummary | undefined;
  isLoading: boolean = false;
  summ: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DaySummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      dateSelected: Date;
    },
    private loader: LoaderService,
    private db: ReportsService,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private firestore: Firestore,
    public dataProvider: DataProviderService,//copy this
    public AuthService: AuthService,//copy this
    private ReportsService: ReportsService
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
      //this.setChartData();
    });
  }

  agentDetail: any
  allowedCities: any []
  async getUsersBooking() {
    const selectedDate = new Date(this.dateSelected);
    selectedDate.setHours(0, 0, 0, 0);
    const startTimeStamp = selectedDate.getTime();
    selectedDate.setHours(23, 59, 0, 0);
    const endTimeStamp = selectedDate.getTime();
    const uniqueAgents: Set<string> = new Set();
    const allowedCities = await this.AuthService.getAllowedCities();
      
    this.allowedCities = allowedCities.map((city:any) => city.cityId);
    try {
      let totalSales = 0;
      let discount = 0;
      let tax = 0;
      let totalJobAcceptanceCharge = 0;
      let bookingInProgress = 0;
      let bookingExpired = 0;
      let bookingDiscarded = 0;
      let bookingCompleted = 0;
      let totalBooking = 0;
      let numberOfBookingsWithDiscount = 0;
      let numberOfServices = 0;
      let numberOfAgents = 0;

      const users = await this.ReportsService.getDaySummaryy();

      const bookingPromises = users.docs.map(async (user: any) => {
        const summary = await getDocs(collection(this.firestore, 'users', user.id, 'bookings'));

        summary.docs.forEach((summaryDoc: any) => {
          const booking = summaryDoc.data();
          const assignedAgent = booking?.["assignedAgent"];
          if (assignedAgent !== undefined) {
            uniqueAgents.add(assignedAgent);
          }
          numberOfAgents = uniqueAgents.size;


          const bookingDate = booking['timeSlot']['date'].toDate().getTime();
          // const BookingTimeStamp = new Date(bookingDate).getTime();
          let validBooking=false;  
    if ( this.dataProvider.cityId == booking?.["address"].cityId  ){
        validBooking=true;
      
    }
    else if(this.dataProvider.cityId=="all"){
      this.allowedCities.map((cid:any)=>{
        if(cid==booking?.["address"].cityId){
          validBooking=true;
        }
      })
    }
          if (bookingDate >= startTimeStamp && bookingDate <= endTimeStamp && validBooking==true) {
            totalSales += booking?.['billing'].grandTotal || 0;
            discount += booking?.['billing'].discount || 0;
            tax += booking?.['billing'].tax || 0;
            totalJobAcceptanceCharge += booking?.['billing'].totalJobAcceptanceCharge || 0;
            totalBooking++;

            if (booking && booking['services'] && booking['services'][0] && booking['services'][0].name && booking['services'][0].name.length > 0) {
              numberOfServices += booking['services'].length;
            }

            if (booking && typeof booking['billing'].discount === 'number' && booking['billing'].discount > 0) {
              numberOfBookingsWithDiscount++;
            }

            switch (booking['stage']) {
              case 'inProgress':
                bookingInProgress++;
                break;
              case 'completed':
                bookingCompleted++;
                break;
              case 'expired':
                bookingExpired++;
                break;
              case 'discarded':
                bookingDiscarded++;
                break;
            }
          }
        });
      });

      await Promise.all(bookingPromises);

      this.summary = {
        'sales': Math.round(totalSales),
        'discount': Math.round(discount),
        'taxes': Math.round(tax),
        'jobAcceptanceCharge': totalJobAcceptanceCharge,
        'cancelledAmount': 0,
        'bookings': totalBooking,
        'bookingsInProgress': bookingInProgress,
        'bookingsCompleted': bookingCompleted,
        'bookingsCancelled': bookingDiscarded,
        'bookingsExpired': bookingExpired,
        'discountedBookings': numberOfBookingsWithDiscount,
        'availableAgents': 0,
        'unavailableAgents': 0,
        'bookingAcceptedAgents': 0,
        'uniqueCustomers': 0,
        'uniqueAgents': numberOfAgents,
        'services': numberOfServices,
        'noOfRatings': 0,
        'totalRatings': 0,
      };

    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  }
  private async loadSummary() {
    await this.getUsersBooking();
  }

  downloadExcel() {
    this.excelService.export(
      this.summary ? this.summaryArr : [],
      'Summary for ' + this.dateSelectedStr
    );
  }

  downloadPDF() {
    this.pdfService.export(
      this.summary ? this.summaryArr : [],
      'Summary for ' + this.dateSelectedStr
    );
  }

  private get summaryArr() {
    return Object.entries(this.summary as any).map(([key, value]) => {
      if (
        [
          'sales',
          'discount',
          'taxes',
          'jobAcceptanceCharge',
          'cancelledAmount',
        ].includes(key)
      ) {
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
    return (
      spacedString.charAt(0).toUpperCase() + spacedString.slice(1).toLowerCase()
    );
  }

  private get dateSelectedStr(): string {
    return this.dateSelected.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}