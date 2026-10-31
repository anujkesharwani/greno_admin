import { Booking } from "../core/booking.structure";

export interface AgentInfo {
	image:string;
	name:string;
	phone:string;
	email:string;
	chatId:string;
	userId:string;
	active: boolean;
	totalOrders:number;
	averageBills:number;
	totalBills:number;
	totalBillsAmount:number;
	pendingBills:number;
	pendingAmount:number;
	registerDate:any;
	currentLocation:{
		longitude:number;
		latitude:number;
	}
	orders:Booking[];
	aadharNumber: string;
	aadhaarImageUrl: string;
	panNumber: string;
	panImageUrl: string;
	completedBookings: number;
	completedBookingsToday: number;
	totalAcceptanceAmount: number;
	totalAcceptanceAmountToday: number;
	address: string;
	cityId:string;
}