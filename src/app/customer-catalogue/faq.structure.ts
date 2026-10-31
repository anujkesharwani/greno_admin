import { Timestamp } from "firebase/firestore";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  show: boolean;
  createdAt: Timestamp;
}
