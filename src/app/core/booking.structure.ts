import { Timestamp } from "@angular/fire/firestore";
import { Address } from "./address.structure";
import { Coupon } from "./coupons.structure";
import { Tax } from "./taxes.structure";

export interface Booking {
  id: string;
  isDelivery?: boolean;
  agentData?: {
    agentName: string;
    agentID: string;
    agentPic: string;
  };
  services: SelectedService[];
  appliedCoupon?: Coupon;
  billing: {
    grandTotal: number;
    tax: number;
    discount: number;
    coupanDiscunt?: number;
    subTotal: number;
    totalJobTime: number;
    totalJobAcceptanceCharge: number;
  };
  createdAt: Timestamp;
  jobOtp: string;
  address?: Address;
  timeSlot?: {
    date: Timestamp;
    time: Timestamp;
  };
  currentUser: {
    userId: string;
    name: string;
    avatar: string;
    phoneNumber: string;
  };
  payment?: any;
  assignedAgent?: string;
  stage?: string;
  tabTitle?: string;
}

export interface BookingUpdated {
  id: string;
  subCategory: {
    id: string;
    name: string;
    image: string;
  };
  mainCategory: {
    id: string;
    name: string;
    image: string;
    icon: string;
  };
  services: SelectedService[];
  appliedCoupon?: Coupon;
  billing: {
    grandTotal: number;
    tax: number;
    discount: number;
    coupanDiscunt?: number;
    subTotal: number;
    totalJobTime: number;
    totalJobAcceptanceCharge: number;
    fixedCharges: any[];
  };
  createdAt: Timestamp;
  jobOtp: string;
  address?: Address;
  timeSlot?: {
    date: Timestamp;
    time: {
      startTime: Timestamp;
      endTime: Timestamp;
    };
    id: string;
  };
  currentUser: {
    userId: string;
    name: string;
    phoneNumber: string;
  };
  payment?: any;
  assignedAgent?: string;
  stage?: string;
  tabTitle?: string;
}

export interface SelectedService {
  name: string;
  serviceId: string;
  description: string;
  image: string;
  video: string;
  allowReviews: boolean;
  taxes: natureTax[];
  discounts: Coupon[];
  variants: SelectedVariant[];
  color: string;
  taxType: string;
}

export interface Assignment {
  acceptanceTime?: Date;
  accepted: boolean;
  actionPerformed: boolean;
  agentId: string;
  bookingID: string;
  customerId: string;
  date: Date;
}

export interface SelectedVariant {
  quantity: number;
  // variant variables
  price: number;
  jobDuration: number;
  description: string;
  jobAcceptanceCharge: number;
  name: string;
  // identifiers
  variantId: string;
  serviceId: string;
  mainCategoryId: string;
  subCategoryId: string;
  billing: {
    originalPrice: number;
    totalPrice: number;
    discount: number;
    discountedPrice: number;
    tax: number;
    untaxedPrice: number;
  };
}

export interface natureTax extends Tax {
  nature: "inclusive" | "exclusive";
  totalAppliedAmount?: number;
}
