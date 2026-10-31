import { Subscription } from "rxjs";

export interface Agent {
	name: string,
	phoneNumber: string,
	id: string,
	slots: Slot[],
	present: string,
}

export interface Slot {
	id: string,
	working: boolean,
	perDayJob: number
}

export interface extendedAgent extends Agent {
	subCategories: extendedSlot[];
	subscription: Subscription;
}
export interface extendedSlot extends Agent {
	slots: Slot[];
	subscription: Subscription;
}