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
} from "@angular/fire/firestore";



@Injectable({
  providedIn: "root",
})
export class UserPermissionService {

  constructor(private firestore: Firestore) {}


  addRole(roleData: any) {
    if (roleData.roleId) {
      return updateDoc(doc(this.firestore, "roles", roleData.roleId), roleData);
    } else {
      return setDoc(doc(this.firestore, "roles", roleData.roleName), roleData);
    }
  }

  addUser(userData: any) {
    if (userData.userId) {
      return updateDoc(
        doc(this.firestore, "admin-user", userData.userId),
        userData
      );
    } else {
      return setDoc(
        doc(this.firestore, "admin-user", userData.email),
        userData
      );
    }
  }

  getRole() {
    return getDocs(collection(this.firestore, "roles"));
  }
  getUsers() {
    return getDocs(collection(this.firestore, "admin-user"));
  }

  deleteRole(roleId: any) {
    return deleteDoc(doc(this.firestore, "roles", roleId));
  }
  deleteUser(userId: any) {
    return deleteDoc(doc(this.firestore, "admin-user", userId));
  }
  updateRoleStatus(id: any, status: any) {
    return updateDoc(doc(this.firestore, "roles", id), { active: status });
  }
  updateUserStatus(id: any, status: any) {
    return updateDoc(doc(this.firestore, "admin-user", id), { active: status });
  }

}