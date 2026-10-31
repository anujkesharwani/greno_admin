export interface Category {
    id: string;
    name: string;
    image: string;
    description:string,
    subCategories: SubCategory[];
    icon?: string;
  }
  export interface SubCategory {
    id: string;
    name: string;
    image: string;
    services: Service[];
  }
  export interface Service {
    id: string;
    name: string;
    image: string;
    video: string;
    description: any;
    enabled: boolean;
    allowReviews: boolean;
    taxes: any[];
    discounts: any[];
    variants: {
      id:string;
      price: number;
      name: string;
      description: string;
      jobDuration: number;
      jobAcceptanceCharge: number;
    }[];
    color: string;
    taxType: string,
  }
  