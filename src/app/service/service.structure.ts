export interface Service {
  id: string;
  name: string;
  image: string[];
  video: string;
  hsnCode: string;
  description: any;
  enabled: boolean;
  allowReviews: boolean;
  taxes: any[];
  services?: any[];
  taxType: "inclusive" | "exclusive";
  discounts: any[];
  price?: string;
  clothes: Variant[];
  reviewEditable: number;
  color: string;
  tags: string[];
}

export interface Variant {
  enabled: boolean;
  cost: number;
  name: string;
  image: String;
  id: string;
}
export interface CategorizedService extends Service {
  category: {
    id: string;
    name: string;
  };
  subCategory: {
    id: string;
    name: string;
  };
}
