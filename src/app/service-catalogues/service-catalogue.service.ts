import { Injectable } from '@angular/core';
import { Firestore, doc,collection, getDocs, addDoc, setDoc, collectionData, docData, query, collectionGroup, updateDoc, Timestamp, where, deleteDoc } from '@angular/fire/firestore';
import { ServiceCatalogue } from './service-category.structure';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceCatalogueService {
  constructor(
    private firestore:Firestore,
    private http: HttpClient
  ) { }

  getServiceCatalogue() {
    
    return getDocs(collection(this.firestore, 'service-catalogue'));
    
    
  }

  updateServiceCatalogueStatus(id: string, status: boolean) {
    return updateDoc(doc(this.firestore, 'service-catalogue', id), {active: status});
  }

  deleteServiceCatalogue(id: string) {
    return deleteDoc(doc(this.firestore, 'service-catalogue', id));
  }

  addServiceCatalogue(catalogue: ServiceCatalogue){
    return addDoc(collection(this.firestore, 'service-catalogue'), catalogue);
  }

  updateServiceCatalogue(catalogue: ServiceCatalogue){
    return updateDoc(doc(this.firestore, 'service-catalogue', catalogue.id), {...catalogue});
  }

  getServiceCatalogueSubscription(){
    return collectionData(collection(this.firestore, 'service-catalogue'), {idField: 'id'});
  }

  getCategoriesSubscription(id: string){
    return collectionData(collection(this.firestore, 'service-catalogue', id, 'categories'), {idField:'id'});
  }

  getSubCategoriesSubscription(catalogueId: string, categoryId: string){
    return collectionData(collection(this.firestore, 'service-catalogue', catalogueId, 'categories', categoryId, 'categories'), {idField:'id'});
  }

  getServicesSubscription(catalogueId: string, mainCategoryId: string, subCategoryId: string){
    return collectionData(collection(this.firestore,'service-catalogue', catalogueId, 'categories', mainCategoryId, 'categories', subCategoryId, 'services'), {idField:'id'});
  }

  deleteCategory(serviceCatalogId: string, categoryId: string) {
    return deleteDoc(doc(this.firestore, 'service-catalogue', serviceCatalogId, 'categories', categoryId));
  }

  deleteSubCategory(serviceCatalogId: string, categoryId: string, subCategoryId: string) {
    return deleteDoc(doc(this.firestore, 'service-catalogue', serviceCatalogId, 'categories', categoryId, 'categories', subCategoryId));
  }

  deleteService(serviceCatalogId: string, categoryId: string, subCategoryId: string, serviceId: string) {
    return deleteDoc(doc(this.firestore, 'service-catalogue', serviceCatalogId, 'categories', categoryId, 'categories', subCategoryId, 'services', serviceId));
  }
}