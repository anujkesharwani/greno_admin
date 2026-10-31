import { Timestamp } from "firebase/firestore";

export interface Coupon {
  id: string;
  serviceCatalogueID?: string;
  name: string;
  code: string;
  description: string;
  type: "fixed" | "percentage";
  amount: number;
  minimumRequiredAmount?: number;
  maximumDiscountAmount?: number;
  maxUsesPerUserDaily?: number;
  maxUsesPerUserWeekly?: number;
  visibilityEnabled: boolean;
  visibilitySettings: any;
  createdOn: Timestamp;
  lastUpdated: Timestamp;
  value: number;
}
