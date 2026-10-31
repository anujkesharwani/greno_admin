import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, setDoc } from '@angular/fire/firestore';
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { Banner } from './banner.structure';
import {
  BannerSectionSettings,
  BannerSettings,
  CancellationSettings,
  ContactSettings,
  FAQSettings,
} from './settings.structure';
import { FAQ } from './faq.structure';

@Injectable({
  providedIn: 'root',
})
export class CustomerSettingsService {
  constructor(private firestore: Firestore) { }

  getMobileBannerSettings() {
    return getDoc(doc(this.firestore, 'customer-settings', 'mobile-banners'));
  }

  getMobileBannerSections() {
    return getDocs(
      query(
        collection(
          this.firestore,
          'customer-settings',
          'mobile-banners',
          'sections'
        ),
        orderBy('createdAt', 'asc')
      )
    );
  }

  getMobileBanners(sectionId: string) {
    return getDocs(
      query(
        collection(
          this.firestore,
          'customer-settings',
          'mobile-banners',
          'sections',
          sectionId,
          'banners'
        ),
        orderBy('createdAt', 'asc')
      )
    );
  }

  getDesktopBannerSettings() {
    return getDoc(doc(this.firestore, 'customer-settings', 'desktop-banners'));
  }

  getDesktopBannerSections() {
    return getDocs(
      query(
        collection(
          this.firestore,
          'customer-settings',
          'desktop-banners',
          'sections'
        ),
        orderBy('createdAt', 'asc')
      )
    );
  }

  getDesktopBanners(sectionId: string) {
    return getDocs(
      query(
        collection(
          this.firestore,
          'customer-settings',
          'desktop-banners',
          'sections',
          sectionId,
          'banners'
        ),
        orderBy('createdAt', 'asc')
      )
    );
  }

  getContact() {
    return getDoc(doc(this.firestore, 'customer-settings', 'contact'));
  }

  getCancellation() {
    return getDoc(doc(this.firestore, 'customer-settings', 'cancellation'));
  }

  getFaqSettings() {
    return getDoc(doc(this.firestore, 'customer-settings', 'faqs'));
  }

  getFaqs() {
    return getDocs(
      query(
        collection(this.firestore, 'customer-settings', 'faqs', 'questions'),
        orderBy('createdAt', 'asc')
      )
    );
  }

  updateMobileBannerSettings(settings: BannerSettings) {
    return updateDoc(
      doc(this.firestore, 'customer-settings', 'mobile-banners'),
      settings as any
    );
  }

  addMobileBanner(sectionId: string, banner: Banner) {
    return addDoc(
      collection(
        this.firestore,
        'customer-settings',
        'mobile-banners',
        'sections',
        sectionId,
        'banners'
      ),
      banner
    );
  }

  updateMobileBannerSectionSettings(
    sectionId: string,
    settings: BannerSectionSettings
  ) {
    return updateDoc(
      doc(
        this.firestore,
        'customer-settings',
        'mobile-banners',
        'sections',
        sectionId
      ),
      settings as any
    );
  }

  updateMobileBanner(sectionId: string, bannerId: string, banner: Banner) {
    return updateDoc(
      doc(
        this.firestore,
        'customer-settings',
        'mobile-banners',
        'sections',
        sectionId,
        'banners',
        bannerId
      ),
      banner as any
    );
  }

  deleteMobileBanner(sectionId: string, bannerId: string) {
    return deleteDoc(
      doc(
        this.firestore,
        'customer-settings',
        'mobile-banners',
        'sections',
        sectionId,
        'banners',
        bannerId
      )
    );
  }

  updateDesktopBannerSettings(settings: BannerSettings) {
    return updateDoc(
      doc(this.firestore, 'customer-settings', 'desktop-banners'),
      settings as any
    );
  }

  addDesktopBanner(sectionId: string, banner: Banner) {
    return addDoc(
      collection(
        this.firestore,
        'customer-settings',
        'desktop-banners',
        'sections',
        sectionId,
        'banners'
      ),
      banner
    );
  }

  updateDesktopBannerSectionSettings(
    sectionId: string,
    settings: BannerSectionSettings
  ) {
    return updateDoc(
      doc(
        this.firestore,
        'customer-settings',
        'desktop-banners',
        'sections',
        sectionId
      ),
      settings as any
    );
  }

  updateDesktopBanner(sectionId: string, bannerId: string, banner: Banner) {
    return updateDoc(
      doc(
        this.firestore,
        'customer-settings',
        'desktop-banners',
        'sections',
        sectionId,
        'banners',
        bannerId
      ),
      banner as any
    );
  }

  deleteDesktopBanner(sectionId: string, bannerId: string) {
    return deleteDoc(
      doc(
        this.firestore,
        'customer-settings',
        'desktop-banners',
        'sections',
        sectionId,
        'banners',
        bannerId
      )
    );
  }

  updateContactSettings(settings: ContactSettings) {
    return updateDoc(
      doc(this.firestore, 'customer-settings', 'contact'),
      settings as any
    );
  }

  updateCancellationSettings(settings: CancellationSettings) {
    return updateDoc(
      doc(this.firestore, 'customer-settings', 'cancellation'),
      settings as any
    );
  }

  addFaq(faq: FAQ) {
    return addDoc(
      collection(this.firestore, 'customer-settings', 'faqs', 'questions'),
      faq
    );
  }

  updateFaqSettings(settings: FAQSettings) {
    return updateDoc(
      doc(this.firestore, 'customer-settings', 'faqs'),
      settings as any
    );
  }

  updateFaq(faqId: string, faq: FAQ) {
    return updateDoc(
      doc(this.firestore, 'customer-settings', 'faqs', 'questions', faqId),
      faq as any
    );
  }

  deleteFaq(faqId: string) {
    return deleteDoc(
      doc(this.firestore, 'customer-settings', 'faqs', 'questions', faqId)
    );
  }

  addCharges(charge: any) {
    return addDoc(
      collection(
        this.firestore,
        'customer-settings',
        'fixed-charges',
        'charges'
      ),
      charge
    );
  }

  async updateCharges(charge: any) {
    return await updateDoc(
      doc(
        this.firestore,
        'customer-settings',
        'fixed-charges',
        'charges',
        charge.id
      ),
      charge
    );
  }

  getCharges() {
    return getDocs(collection(this.firestore, 'customer-settings', 'fixed-charges', 'charges'));
  }

  deleteCharge(chargeId: string) {
    return deleteDoc(
      doc(this.firestore, 'customer-settings', 'fixed-charges', 'charges', chargeId)
    );
  }
}
