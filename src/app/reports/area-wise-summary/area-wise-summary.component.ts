// import { CustomerWiseSummaryComponent } from './CustomerWiseSummaryComponent';
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Booking } from "../booking.structure";
import { ExcelService } from "../excel.service";
import { ReportsService } from "../reports.service";
import { PdfService } from "../pdf.service";
import { Firestore } from "@angular/fire/firestore";
import { MatDatepicker } from "@angular/material/datepicker";
import { LoaderService } from "src/app/Shared/shared-services/loader.service";
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
} from "firebase/firestore";
import { AuthService } from "src/app/auth/auth.service";
import { DataProviderService } from "src/app/core/data-provider.service";
export interface summary {
  id: string | number;
  name: string;
  discount: number;
  taxes: number;
  bookings: number;
  bookingsCancelled: number;
  availableAgents: number;
  totalRatings: number;
}
@Component({
  selector: "app-area-wise-summary",
  templateUrl: "./area-wise-summary.component.html",
  styleUrls: ["./area-wise-summary.component.scss"],
})
export class AreaWiseSummaryComponent implements OnInit {
  refreshedAt: string = "";
  dateSelected: Date = new Date();
  today: Date = new Date();
  bookings: Booking[] | any;
  customerSummary: any[] = [];

  //   summary: summary | undefined;
  isLoading: boolean = false;
  chartData:
    | { labels: string[]; data: number[]; backgroundColor: string[] }
    | undefined;
  summ: any[] = [];
  @ViewChild("picker") picker!: MatDatepicker<Date>;
  summary: {
    id: string | number;
    name: string;
    discount: number;
    taxes: number;
    bookings: number;
    bookingsCancelled: number;
    availableAgents: number;
    totalRatings: number;
  };
  constructor(
    public dialogRef: MatDialogRef<AreaWiseSummaryComponent>,
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
    this.loadSummary();
  }

  refresh(): void {
    this.isLoading = true;
    this.refreshedAt = "Refreshing...";
    this.loadSummary().then(() => {
      this.refreshedAt = "Data loaded at " + new Date().toLocaleTimeString();
      this.isLoading = false;
    });
  }
  agentDetail: any;
  allowedCities: any [] //copy this
  async getUsersBoooking(): Promise<void> {
    const selectedDate = new Date(this.dateSelected);
    selectedDate.setHours(0, 0, 0, 0);
    const startTimeStamp = selectedDate.getTime();

    selectedDate.setHours(23, 59, 59, 999);
    const endTimeStamp = selectedDate.getTime();
    const allowedCities = await this.AuthService.getAllowedCities();
      
    this.allowedCities = allowedCities.map((city:any) => city.cityId);
    this.customerSummary = [];

    try {
      const usersSnapshot = await this.ReportsService.getDaySummaryy();
      const summaryMap = new Map<string, any>();
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
          const areaId = bookingData?.["address"]["selectedArea"].id;
          const areaName = bookingData?.["address"]["selectedArea"].name;
          const grandTotal = Math.round(bookingData?.["billing"].grandTotal || 0);
          const tax = Math.round(bookingData?.["billing"].tax || 0);
          const isDiscarded = bookingData["stage"] === "discarded" ? 1 : 0;

          if (summaryMap.has(areaId)) {
            const existingArea = summaryMap.get(areaId);
            existingArea.sales += grandTotal;
            existingArea.taxes += tax;
            existingArea.totalBooking++;
            existingArea.discarded += isDiscarded;
          } else {
            summaryMap.set(areaId, {
              id: areaId,
              name: areaName,
              sales: grandTotal,
              totalBooking: 1,
              taxes: tax,
              discarded: isDiscarded,
            });
          }
        }
      }


      this.customerSummary = Array.from(summaryMap.values());


    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  }

  private async loadSummary() {
    await this.getUsersBoooking();
  }
  downloadExcel() {
    this.excelService.export(
      this.summary ? this.summaryArr : [],
      "Summary for " + this.dateSelectedStr
    );
  }

  downloadPDF() {
    if (this.customerSummary.length === 0) {
      console.warn('No summary data available to export.');
      return;
    }
  
    console.log('downloadPDF called');
    console.log('Summary Array:', this.customerSummary);
    this.pdfService.export(this.customerSummary, "Summary for " + this.dateSelectedStr);
  }

  private get summaryArr() {
    return Object.entries(this.summary as any).map(([key, value]) => {
      if (
        [
          "sales",
          "discount",
          "taxes",
          "jobAcceptanceCharge",
          "cancelledAmount",
        ].includes(key)
      ) {
        value = "Rs. " + value;
      }
      return {
        key: this.camelCaseToTitleCase(key),
        value,
      };
    });
  }

  private camelCaseToTitleCase(str: string): string {
    const spacedString = str.replace(/([A-Z])/g, " $1");
    return (
      spacedString.charAt(0).toUpperCase() + spacedString.slice(1).toLowerCase()
    );
  }

  private get dateSelectedStr(): string {
    return this.dateSelected.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
