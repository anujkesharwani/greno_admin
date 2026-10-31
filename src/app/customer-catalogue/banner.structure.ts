import { Timestamp } from 'firebase/firestore';

export interface Banner {
  id: string;
  imageUrl: string;
  fileName: string;
  redirectUrl: string;
  show: boolean;
  createdAt: Timestamp;
}

export interface BannerSection {
  id: string;
  name: string;
  show: boolean;
  banners: Banner[];
  createdAt: Timestamp;
}