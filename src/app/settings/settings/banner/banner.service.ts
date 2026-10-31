import { Injectable, OnInit } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
  query,
  getDocs,
  docData,
  collection,
  getDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

import { Banner } from 'src/app/settings/content-management/content-management.component';

@Injectable({
  providedIn: 'root',
})
export class BannerService implements OnInit {
  constructor(private firestore: Firestore,
    private storage:Storage) {}

  // storage = getStorage();

  ngOnInit(): void {}

  addBanner(banner: Banner) {
    addDoc(collection(this.firestore, 'Banner'), banner).then((data) => {
    });
  }

  upload(path: string, file: File | ArrayBuffer | Blob | Uint8Array) {
    if (file) {
      const storageRef = ref(this.storage, path);
      const task = uploadBytesResumable(storageRef, file);
      const url = getDownloadURL(storageRef);
      return url;
    } else {
      return;
    }
  }

  getBanner() {
    return getDocs(collection(this.firestore, 'Banner'));
  }

  updateBanner(banner: Banner) {
    updateDoc(doc(this.firestore, 'Banner/' + banner.id), {
      id: banner.id,
      title: banner.title,
      bannerUrl: banner.bannerUrl,
      start: banner.start,
      end: banner.end,
      img: banner.img,
    });
  }

  deleteBanner(id: string) {
    deleteDoc(doc(this.firestore, 'Banner/' + id));
  }
}
