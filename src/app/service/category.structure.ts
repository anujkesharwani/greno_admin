export interface Category {
	id:string;
	name:string;
	icon?: string;
	image?:string;
	description?:string;
	enabled:boolean;
	lockInPeriod:number;
	allowReviews:boolean;
	price:number;
	taxes?:any[];
	discounts?:any[];
	variants?:any[];
}