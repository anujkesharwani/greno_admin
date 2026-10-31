import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, getFirestore, updateDoc, writeBatch } from '@angular/fire/firestore';
import { Tags } from './tags.structure';
@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private firestore:Firestore) { }

  addServiceTag(tag: Tags){
    return addDoc(collection(this.firestore, 'service-tags'), tag);
  }

  async addServiceTags(tags: Tags[]){
    const db = getFirestore();
    const batch = writeBatch(db);
    tags.map((item) => {
      const tagsRef = doc(collection(db, `service-tags`));
      batch.set(tagsRef, item);
    });
    batch.commit();
  }

  updateServiceTag(tag: Tags){
    return updateDoc(doc(this.firestore, 'service-tags', tag.id), {...tag});
  }

  deleteServiceTag(tag: Tags){
    return deleteDoc(doc(this.firestore, 'service-tags', tag.id));
  }

  getServiceTag(){
    return getDocs(collection(this.firestore, 'service-tags'));
  }

  getServiceTagSubscription(){
    return collectionData(collection(this.firestore, 'service-tags'), {idField:'id'});
  }
}
