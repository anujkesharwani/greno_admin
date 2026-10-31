import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Category } from './category.structure';
import { Service } from './service.structure';
import { BehaviorSubject, ReplaySubject, Subject, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  updateServiceComp:ReplaySubject<void> = new ReplaySubject<void>();
  constructor(private firestore:Firestore) { }

  addService(catalogueId: string, service: Service){
    return addDoc(collection(this.firestore, 'service-catalogue', catalogueId, 'services'), service)
  }




  updateService(catalogueId: string, service: Service){
    return setDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'services', service.id), {...service}, {merge:true})
  }

  // deleteService(catalogueId: string, service: Service, mainCategory: Category, subCategory: Category){
  //   return updateDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'categories', mainCategory.id, 'categories', subCategory.id, 'services', service.id), {...service})
  // }

  deleteService(catalogueId: any, service: any) {
    return deleteDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'services', service));
  }
  

  getServices(catalogueId: string){
    
    return getDocs(collection(this.firestore, 'service-catalogue', catalogueId, 'services'));
   

  }

  getServiceById(catalogueId: string, id: string){

    return getDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'services', id));
  }

  getServicesSubscription(catalogueId: string, mainCategory: Category, subCategory: Category){
    return collectionData(collection(this.firestore, 'service-catalogue', catalogueId, 'categories', mainCategory.id, 'categories', subCategory.id, 'services'), {idField: 'id'});
  }

}
