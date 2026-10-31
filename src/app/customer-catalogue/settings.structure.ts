import { Timestamp } from "firebase/firestore";

export interface BannerSettings {
  show: boolean;
}

export interface BannerSectionSettings {
  name: string;
  show: boolean;
  createdAt: Timestamp;
}

export interface ContactSettings {
  mobileNumbers: string[];
  whatsappNumbers: string[];
  emails: string[];
  /** In minutes */
  timePeriod: number;
}

export interface CancellationSettings {
  /** In minutes */
  gracePeriod: number;
  chargeType: 'percent' | 'fixed';
  chargeValue: number;
}

export interface FAQSettings {
  show: boolean;
}
