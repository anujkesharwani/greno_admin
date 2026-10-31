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
import { AgentsService } from 'src/app/agents/agents.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AvailableAgentsService } from 'src/app/bookings/expandable-cards/available-agents.service';
import { DataProviderService } from 'src/app/core/data-provider.service';
export interface agentsInfo {
  active: boolean;
}

export interface summary {
  id: string | number;
  sales: number;
  name: string;
  discount: number;
  taxes: number;
  bookings: number;
  bookingsCancelled: number;
  availableAgents: number;
  totalRatings: number;
}
@Component({
  selector: 'app-agent-wise-summary',
  templateUrl: './agent-wise-summary.component.html',
  styleUrls: ['./agent-wise-summary.component.scss']
})
export class AgentWiseSummaryComponent implements OnInit {
  refreshedAt: string = '';
  dateSelected: Date = new Date();
  today: Date = new Date();
  bookings: Booking[] | any;
  customerSummary: any[] = []

  //   summary: summary | undefined;
  isLoading: boolean = false;
  chartData: { labels: string[], data: number[], backgroundColor: string[] } | undefined;
  summ: any[] = []; 
  customers: agentsInfo[] = [];
  //allowedCities: any[] = [];
  filteredCustomers: agentsInfo[] = [];
  allAgents: any[];
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  summary: { id: string | number; name: string; discount: number; taxes: number; bookings: number; bookingsCancelled: number; availableAgents: number; totalRatings: number; };
  constructor(
    public dialogRef: MatDialogRef<AgentWiseSummaryComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      dateSelected: Date;
    },
    private excelService: ExcelService,
    private pdfService: PdfService,
    private ReportsService: ReportsService,
    public AuthService: AuthService,
    private AgentService: AgentsService,
    private customerService: AgentsService,
    private availableAgentsService: AvailableAgentsService,
    private firestore: Firestore,
    public dataProvider: DataProviderService,//copy this

  ) { }

  ngOnInit(): void {
    this.dateSelected = this.data.dateSelected;
    // this.refresh();
    this.loadSummary();
  }

  refresh(): void {
    this.isLoading = true;
    this.refreshedAt = 'Refreshing...';
    this.loadSummary().then(() => {
      this.refreshedAt = 'Data loaded at ' + new Date().toLocaleTimeString();
      this.isLoading = false;
    });
  }
  allowedCities: any []
  async getUsersBooking() {
    const selectedDate = new Date(this.dateSelected);
    selectedDate.setHours(0, 0, 0, 0);
    const startTimeStamp = selectedDate.getTime();

    selectedDate.setHours(23, 59, 59, 999);
    const endTimeStamp = selectedDate.getTime();
    const allowedCities = await this.AuthService.getAllowedCities();
      
    this.allowedCities = allowedCities.map((city:any) => city.cityId);
    this.customerSummary = [];

    try {
        const [allowedCities, agents, usersSnapshot] = await Promise.all([
            this.AuthService.getAllowedCities(),
            this.customerService.getAgents(),
            this.ReportsService.getDaySummary()
        ]);

        this.allowedCities = allowedCities.map((city: any) => city.cityId);

        const validCustomers = agents.filter(customer =>
            this.allowedCities.includes(customer.cityId)
        );

        this.customers = validCustomers;
        this.filteredCustomers = validCustomers;
        this.allAgents = validCustomers;

        const bookingsPromises = usersSnapshot.docs.map((user: any) => {
            return getDocs(collection(this.firestore, 'users', user.id, 'bookings')).then(snapshot => 
                snapshot.docs.map((booking: any) => booking.data())
            );
        });

        const allBookings = (await Promise.all(bookingsPromises)).flat();

        const agentDetailsCache = new Map<string, any>(); // Cache to store agent details

        const agentDetailPromises = allBookings
            .filter(bookingData => {
                const bookingDate = bookingData['timeSlot']['date'].toDate().getTime();
                return bookingDate >= startTimeStamp && bookingDate <= endTimeStamp;
            })
            .map(async bookingData => {
                const assignedAgentId = bookingData['assignedAgent'];
                if (assignedAgentId && !agentDetailsCache.has(assignedAgentId)) {
                    const agentDoc = await getDoc(doc(this.firestore, 'agents', assignedAgentId));
                    const agentDetail = agentDoc.data();
                    agentDetailsCache.set(assignedAgentId, agentDetail);
                }
                return bookingData;
            });

        await Promise.all(agentDetailPromises);

        for (const bookingData of allBookings) {
            const bookingDate = bookingData['timeSlot']['date'].toDate().getTime();
            const areaName = bookingData?.["address"]["selectedArea"].name;
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
                const assignedAgentId = bookingData['assignedAgent'];
                if (assignedAgentId) {
                    const agentDetail = agentDetailsCache.get(assignedAgentId);
                    const AgentName = agentDetail?.['name'];

                    const existingAgentIndex = this.customerSummary.findIndex((c) => c.id === assignedAgentId);
                    if (existingAgentIndex !== -1) {
                        this.customerSummary[existingAgentIndex].totalBooking++;
                        this.customerSummary[existingAgentIndex].sales +=Math.round (bookingData?.['billing'].grandTotal || 0);
                    } else {
                        this.customerSummary.push({
                            id: assignedAgentId,
                            name: AgentName,
                            area: areaName,
                            totalBooking: 1,
                            sales: Math.round(bookingData?.['billing'].grandTotal || 0),
                        });
                    }
                }
            }
        }

        // console.log(this.customerSummary); // Check the populated customerSummary array

    } catch (error) {
        console.error('Error fetching agents or bookings', error);
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