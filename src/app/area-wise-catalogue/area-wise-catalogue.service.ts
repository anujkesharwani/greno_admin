import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Firestore,
  doc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  collectionData,
  docData,
  query,
  collectionGroup,
  updateDoc,
  Timestamp,
  where,
  deleteDoc,
  getDoc,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AreaWiseCatalogueService {
  constructor(private firestore: Firestore, private http: HttpClient) {}

  getAllAreas() {
    return getDocs(collectionGroup(this.firestore, "areas"));
  }

  getState() {
    return getDocs(collection(this.firestore, "areas"));
  }

  getCity(stateId: string) {
    return getDocs(collection(this.firestore, "areas", stateId, "cities"));
  }
  getArea(stateId: string, cityId: string) {
    return getDocs(
      collection(this.firestore, "areas", stateId, "cities", cityId, "areas")
    );
  }

  getCityDetails(stateId: string, cityId: string) {
    return getDoc(doc(this.firestore, "areas", stateId, "cities", cityId));
  }

  updateCityStatus(stateId: string, cityId: string, status: boolean) {
    return updateDoc(doc(this.firestore, "areas", stateId, "cities", cityId), {
      active: status,
    });
  }

  getStateSubscription() {
    return collectionData(collection(this.firestore, "areas"), {
      idField: "id",
    });
  }

  getCitySubscription(stateId: string) {
    return collectionData(
      collection(this.firestore, "areas", stateId, "cities"),
      { idField: "id" }
    );
  }

  getAreaSubscription(stateId: string, cityId: string) {
    return collectionData(
      collection(this.firestore, "areas", stateId, "cities", cityId, "areas"),
      { idField: "id" }
    );
  }

  updateAreaStatus(
    stateId: string,
    cityId: string,
    areaId: string,
    status: boolean
  ) {
    return updateDoc(
      doc(this.firestore, "areas", stateId, "cities", cityId, "areas", areaId),
      { active: status }
    );
  }

  updateAreaCatalogue(
    stateId: string,
    cityId: string,
    areaId: string,
    catalogueId: string
  ) {
    return updateDoc(
      doc(this.firestore, "areas", stateId, "cities", cityId, "areas", areaId),
      { serviceCatalogue: catalogueId }
    );
  }

  addAreaInCity(stateId: string, cityId: string, area: any) {
    return addDoc(
      collection(this.firestore, "areas", stateId, "cities", cityId, "areas"),
      area
    );
  }

  addCityInState(stateId: string, obj: any) {
    return addDoc(collection(this.firestore, "areas", stateId, "cities"), obj);
  }

  getAreaOnSearch(searchInput: string) {
    return this.http.get(
      `${environment.firebase.functionURL}getAreaOnSearch?searchInput=${searchInput}`
    );
  }

  getAreaDetail(latitude: string, longitude: string) {
    return this.http.get(
      `${environment.firebase.functionURL}getAreaDetail?latitude=${latitude}&longitude=${longitude}`
    );
  }

  getAreaDetailByPlaceId(placeId: string) {
    return this.http.get(
      `${environment.firebase.functionURL}getAreaDetailByPlaceId?placeId=${placeId}`
    );
  }

  deleteCity(stateId: string, cityId: string) {
    return deleteDoc(doc(this.firestore, "areas", stateId, "cities", cityId));
  }

  deleteArea(stateId: string, cityId: string, areaId: string) {
    return deleteDoc(
      doc(this.firestore, "areas", stateId, "cities", cityId, "areas", areaId)
    );
  }
}
