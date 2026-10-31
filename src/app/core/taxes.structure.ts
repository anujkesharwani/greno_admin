import { Timestamp } from "@angular/fire/firestore";


export interface Tax{
	id?:string;
	name:string;
	rate:number;
	type:'percentage'|'fixed';
	createdOn:Timestamp;
	lastUpdated:Timestamp;
}