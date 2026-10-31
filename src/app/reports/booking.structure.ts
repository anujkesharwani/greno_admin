interface Customer {
  id: string | number;
  name: string;
  phone: string;
}

interface Agent {
  id: string | number;
  name: string;
  phone: string;
}

export interface Booking {
  id: string | number;
  // status: 'Expired' | 'Pending' | 'Cancelled' | 'Completed';
  status:string;
  createdOn: Date;
  bookingDate: Date;
  timeSlot: Date;
  jobStartTime: Date;
  jobEndTime: Date;
  customer: Customer | any;
  agent: Agent;
  address: string;
  category: string;
  subCategory: string;
  services: string[];
  cost: number;
  tax: number;
  jobAcceptanceFee: number;
}
