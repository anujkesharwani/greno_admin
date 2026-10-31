import { Injectable } from '@angular/core';
import { Assignment, Booking, BookingUpdated } from '../core/booking.structure';
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
  documentId,
  or,
  startAt,
} from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { faker } from '@faker-js/faker';
import Utils from '../Shared/shared-services/util';
import { endAt, orderBy } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { ContactSettings } from './settings.structure';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(public firestore: Firestore) {
  }

  //Save Time timePeriod

  // only update agent setting tome period in agent-settings/contacts   data is { }


  // only update agent setting tome period in agent-settings/contacts   data is { }

  // only update agent setting tome period in agent-settings/contacts   data is { }
  updateTimePeriod(timePeriod: any) {
    const docRef = doc(this.firestore, 'agent-settings', 'contact');
    return updateDoc(docRef, { timePeriod: timePeriod });

  }

  updateContactSettings(settings: ContactSettings) {
    return updateDoc(
      doc(this.firestore, 'agent-settings', 'contact'),
      settings as any
    );
  }

  getTimePeriod(){
    return getDocs
  }

  changeQuestionStatus(id: string, status: boolean) {
    // should update the data in agent-setting/faq/questions collection
    const docRef = doc(this.firestore, 'agent-settings/faq/questions', id);
    return updateDoc(docRef, { showQuestion: status });
  }

  toggleFaQ(toggle: boolean) {
    const docRef = doc(this.firestore, 'agent-settings/faq');
    return updateDoc(docRef, { showFaQ: toggle });
  }

  getToggleFaQ() {
    const docRef = doc(this.firestore, 'agent-settings/faq');
    return docData(docRef);
  }

  async getAllFaQs() {
    const collectionRef = collection(
      this.firestore,
      'agent-settings/faq/questions'
    );
    const querySnapshot = await getDocs(collectionRef);

    const faqs: { id: string }[] = [];
    querySnapshot.forEach((doc) => {
      const faq = {
        id: doc.id,
        ...doc.data(),
      };
      faqs.push(faq);
    });

    return faqs;
  }

  addQuestion(data: any) {
    const collectionRef = collection(
      this.firestore,
      'agent-settings/faq/questions'
    );
    return addDoc(collectionRef, data);
  }
  updateQuestion(id: string, data: any) {
    const docRef = doc(this.firestore, 'agent-settings/faq/questions', id);
    return updateDoc(docRef, data);
  }
  deleteQuestion(id: string) {
    const docRef = doc(this.firestore, 'agent-settings/faq/questions', id);
    return deleteDoc(docRef);
  }

  //Agent Settings

  getAllContacts() {
    const docRef = doc(this.firestore, 'agent-settings', 'contact');
    return docData(docRef);
  }

  addContact(data: any) {
    const docRef = doc(this.firestore, 'agent-settings', 'contact');
    return setDoc(docRef, data);
  }
}
