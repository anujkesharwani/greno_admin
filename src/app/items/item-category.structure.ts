
// import { Subscription } from "rxjs";

// export interface Areas {
// 	state: string;
// 	stateId: string;
// 	stateActive: boolean,
// 	city: string;
// 	cityId: string;
// 	cityActive: boolean,
// 	areas: Area[]
// }

// export interface Area {
// 	active: boolean,
// 	address: string,
// 	address_components: any[],
// 	cityKey: string,
// 	cityName: string,
// 	countryId: string,
// 	formatted_address: string,
// 	geoProofingLocality: string,
// 	geometry: any,
// 	latitude: string,
// 	locality: string,
// 	longitude: string,
// 	placeId: string,
// 	postalCode: string,
// 	stateCode: string,
// 	stateName: string,
// 	types: any,
// 	serviceCatalogue: string,
// }

// export interface extendedAreas extends Areas {
// 	subCategories: extendedSubArea[];
// 	subscription: Subscription;
// }
// export interface extendedSubArea extends Areas {
// 	areas: Area[];
// 	subscription: Subscription;
// }

// export interface Item {
// 	id: string;
// 	name: string;
// 	created: string;
// 	active: boolean;
// }