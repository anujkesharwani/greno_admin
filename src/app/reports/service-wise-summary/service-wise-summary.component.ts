// import { CustomerWiseSummaryComponent } from './CustomerWiseSummaryComponent';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Booking } from '../booking.structure';
import { ExcelService } from '../excel.service';
import { ReportsService } from '../reports.service';
import { PdfService } from '../pdf.service';
import { Firestore } from '@angular/fire/firestore';
import { MatDatepicker } from '@angular/material/datepicker';
import { LoaderService } from 'src/app/Shared/shared-services/loader.service';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  documentId,
  orderBy,
  limit,
  collectionGroup,
} from 'firebase/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { DataProviderService } from 'src/app/core/data-provider.service';
export interface summary {
  id: string | number;
  name: string;
  count: number;
  discount: number;
  taxes: number;
  bookings: number;
  bookingsCancelled: number;
  availableAgents: number;
  totalRatings: number;
}
@Component({
  selector: 'app-service-wise-summary',
  templateUrl: './service-wise-summary.component.html',
  styleUrls: ['./service-wise-summary.component.scss']
})
export class ServiceWiseSummaryComponent implements OnInit {
  refreshedAt: string = '';
  dateSelected: Date = new Date();
  today: Date = new Date();
  bookings: Booking[] | any;
  customerSummary: any[] = []

  //   summary: summary | undefined;
  isLoading: boolean = false;

  summ: any[] = [];

  summary: { id: string | number; name: string; discount: number; taxes: number; bookings: number; bookingsCancelled: number; availableAgents: number; totalRatings: number; };
  constructor(
    public dialogRef: MatDialogRef<ServiceWiseSummaryComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      dateSelected: Date;
    },
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
    // this.isLoading = true;
    this.refreshedAt = 'Refreshing...';
    this.loadSummary().then(() => {
      this.refreshedAt = 'Data loaded at ' + new Date().toLocaleTimeString();
      // this.isLoading = false;
    });
  }
  allowedCities: any [] //copy this
  async getUsersBooking(): Promise<void> {
    const selectedDate = new Date(this.dateSelected);
    selectedDate.setHours(0, 0, 0, 0);
    const startTimeStamp = selectedDate.getTime();

    selectedDate.setHours(23, 59, 59, 999);
    const endTimeStamp = selectedDate.getTime();
    const serviceSummaryMap = new Map<string, any>();
    const allowedCities = await this.AuthService.getAllowedCities();
      
      this.allowedCities = allowedCities.map((city:any) => city.cityId);
    this.customerSummary = [];

    try {
      const usersSnapshot = await this.ReportsService.getDaySummaryy();
      const bookingPromises = usersSnapshot.docs.map(async (userDoc: any) => {
        const userId = userDoc.id;
        const bookingsSnapshot = await getDocs(collection(this.firestore, "users", userId, "bookings"));
        return bookingsSnapshot.docs.map((bookingDoc: any) => bookingDoc.data());
      });

      const allBookings = (await Promise.all(bookingPromises)).flat();

      for (const bookingData of allBookings) {
        const bookingDate = bookingData['timeSlot']['date'].toDate().getTime();
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
          for (const service of bookingData['services']) {
            const serviceName = service.name;
            const serviceId = service.id;

            // let totalPrice = 0;
            // if (service['selectedItems']) {
            //     for (const item of service['selectedItems']) {
            //         totalPrice += item.cost * (item.quantity || 1);
            //     }
            // }

            const existingService = serviceSummaryMap.get(serviceName);
            if (existingService) {
              existingService.totalBooking++;
              existingService.sales += Math.round(bookingData?.['billing'].grandTotal || 0);
              existingService.taxes += Math.round(bookingData?.['billing'].tax || 0);
              existingService.discarded += bookingData['stage'] === 'discarded' ? 1 : 0;
            } else {

              serviceSummaryMap.set(serviceName, {
                name: serviceName,
                id: serviceId,
                totalBooking: 1,
                sales: Math.round(bookingData?.['billing'].grandTotal || 0),
                taxes: Math.round(bookingData?.['billing'].tax || 0),
                discarded: bookingData['stage'] === 'discarded' ? 1 : 0
              });
            }
          }
        }
      }


      this.customerSummary = Array.from(serviceSummaryMap.values());

    } catch (error) {
      console.error("Error loading bookings:", error);
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

  // downloadPDF() {
  //   this.pdfService.export(
  //     this.summary ? this.summaryArr : [],
  //     'Summary for ' + this.dateSelectedStr
  //   );
  // }

  downloadPDF() {
    if (this.customerSummary.length === 0) {
      console.warn('No summary data available to export.');
      return;
    }
    this.pdfService.export(this.customerSummary, 'Summary for ' + this.dateSelectedStr);
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
