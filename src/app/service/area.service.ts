import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Category } from './category.structure';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore:Firestore) { }

  addAreas(stateId:any, cityId:any, area:any){
    return addDoc(collection(this.firestore, 'areas', stateId, 'cities', cityId,'areas'), area)
  }

  updateAreas(category:Category){
    console.log('cate', category);
    return updateDoc(doc(this.firestore,'categories', category.id),{...category});
  }

  deleteAreas(category:Category){
    return deleteDoc(doc(this.firestore,'categories',category.id));
  }

  getAreas(){
    return getDocs(collection(this.firestore,'categories'));
  }

  getCategoriesSubscription(){
    return collectionData(collection(this.firestore,'categories'),{idField:'id'});
  }

  addSubCategory(category:Category,mainCategoryId:string){
    return addDoc(collection(this.firestore,'categories',mainCategoryId,'categories'),category);
  }

  updateSubCategory(category:Category,mainCategoryId:string){
    return updateDoc(doc(this.firestore,'categories',mainCategoryId,'categories'),{...category});
  }

  updateSubCategory2(category:Category,mainCategoryId:string,subCategoryId:string){
    return updateDoc(doc(this.firestore,'categories',mainCategoryId,'categories',subCategoryId),{...category});
  }

  deleteSubCategory(category:Category,mainCategoryId:string){
    return deleteDoc(doc(this.firestore,'categories',mainCategoryId,'categories'));
  }

  getSubCategories(mainCategory:Category){
    return getDocs(collection(this.firestore,'categories',mainCategory.id,'categories'));
  }

  getSubCategoriesSubscription(mainCategory:Category){
    return collectionData(collection(this.firestore,'categories',mainCategory.id,'categories'),{idField:'id'});
  }
}
