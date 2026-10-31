import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataProviderService {
  loading: boolean = false;
  cityId: string;
  constructor() {}
}
