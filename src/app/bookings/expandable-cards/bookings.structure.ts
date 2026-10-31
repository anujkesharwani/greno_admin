import { Booking } from 'src/app/core/booking.structure';

export type tabs = {
  title: string;
  info1: number;
  info2: number;
  info3: number;
  color1: string;
  color2: string;
  color3: string;
  isClicked: boolean;
  filteredBookings: any[];
  allBookings: any[];
  filterKeys: string[];
  isFilterSliderActive: boolean;
};

export type agentStruture = {
  name: string;
  contactNumber: string;
  status: string;
  color: string;
};

export type bookings = {
  customerImg: string;
  agentImg: string;
  bookingID: string;
  serviceCat: string;
  price: number;
  stageName: string;
  tabTitle: string;
};
