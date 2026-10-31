import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Category } from './category.structure';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore:Firestore) { }

  addCategory(catalogueId: string, category:Category){
    return addDoc(collection(this.firestore, 'service-catalogue', catalogueId, 'categories'), category);
  }

  updateCategory(catalogueId: string, category: Category){
    return updateDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'categories', category.id), {...category});
  }

  deleteCategory(catalogueId: string, category:Category){
    return deleteDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'categories',category.id));
  }

  getCategories(catalogueId: string){
    return getDocs(collection(this.firestore, 'service-catalogue', catalogueId, 'categories'));
  }

  getCategoriesSubscription(catalogueId: string){
    return collectionData(collection(this.firestore, 'service-catalogue', catalogueId, 'categories'),{idField:'id'});
  }

  addSubCategory(catalogueId: string, category: Category, mainCategoryId: string){
    return addDoc(collection(this.firestore, 'service-catalogue', catalogueId, 'categories', mainCategoryId, 'categories'),category);
  }

  updateSubCategory(catalogueId: string, category: Category, mainCategoryId:string){
    return updateDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'categories', mainCategoryId, 'categories'), {...category});
  }

  updateSubCategory2(catalogueId: string, category:Category,mainCategoryId:string,subCategoryId:string){
    return updateDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'categories', mainCategoryId, 'categories', subCategoryId), {...category});
  }

  updateService(catalogueId: string, categoryId: string, subCategoryId: string, serviceId: string, obj: any){
    return updateDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'categories', categoryId, 'categories', subCategoryId, 'services', serviceId), {...obj});
  }

  deleteSubCategory(catalogueId: string, category:Category,mainCategoryId:string){
    return deleteDoc(doc(this.firestore, 'service-catalogue', catalogueId, 'categories', mainCategoryId, 'categories'));
  }

  getSubCategories(catalogueId: string, mainCategory:Category){
    return getDocs(collection(this.firestore, 'service-catalogue', catalogueId, 'categories', mainCategory.id, 'categories'));
  }

  getSubCategoriesSubscription(catalogueId: string, mainCategory:Category){
    return collectionData(collection(this.firestore, 'service-catalogue', catalogueId, 'categories', mainCategory.id, 'categories'), {idField:'id'});
  }

  getIcons() {
    return getDocs(collection(this.firestore, 'icons'));
  }
}
