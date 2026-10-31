import { Component, OnInit } from '@angular/core';
import { Banner, BannerSection } from './banner.structure';
import { CustomerSettingsService } from './customer-settings-service.service';
import { FAQ } from './faq.structure';
import { MatDialog } from '@angular/material/dialog';
import { BannerDialogComponent } from './banner-dialog/banner-dialog.component';
import { NotificationService } from '../Shared/core/notification.service';
import { LoaderService } from '../Shared/shared-services/loader.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { StorageService } from '../Shared/core/storage/storage.service';
import { BannerSectionSettings, ContactSettings } from './settings.structure';
import { FAQDialogComponent } from './faq-dialog/faq-dialog.component';
import { BookingChargesComponent } from './booking-charges/booking-charges.component';
import { ConfirmationDialogComponent } from '../Shared/dialog/dialog.component';

@Component({
  selector: 'app-customer-catalogue',
  templateUrl: './customer-catalogue.component.html',
  styleUrls: ['./customer-catalogue.component.scss'],
})
export class CustomerCatalogueComponent implements OnInit {
  showMobileBanners: boolean = true;
  mobileBannerSections: BannerSection[] = [];
  nMobileBanners: number = 0;

  showDesktopBanners: boolean = true;
  desktopBannerSections: BannerSection[] = [];
  nDesktopBanners: number = 0;

  mobileNumbersInDb: string[] = [];
  whatsappNumbersInDb: string[] = [];
  emailsInDb: string[] = [];
  mobileNumbers: string[] = [];
  whatsappNumbers: string[] = [];
  emails: string[] = [];

  timePeriodInDb: number = 0;
  timePeriod: number = 0;

  gracePeriodInDb: number = 0;
  gracePeriod: number = 0;
  chargeTypeInDb: 'percent' | 'fixed' = 'percent';
  chargeType: 'percent' | 'fixed' = 'percent';
  chargeValueInDb: number = 0;
  chargeValue: number = 0;

  showFaqs: boolean = true;
  faqs: FAQ[] = [];

  private dialogWidth = '90vw';
  private dialogMaxWidth = '700px';

  constructor(
    private db: CustomerSettingsService,
    private alertify: NotificationService,
    private dialog: MatDialog,
    private loader: LoaderService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loader.showLoader();
    this.db.getMobileBannerSettings().then((res) => {
      const data = res.data();
      if (data) {
        this.showMobileBanners = data['show'];
      }
      this.getCharges();
      this.loader.hideLoader();
    });

    this.loader.showLoader();
    this.db.getMobileBannerSections().then((secRes) => {
      secRes.docs.map((sec) => {
        this.db.getMobileBanners(sec.id).then((bannerRes) => {
          const banners: Banner[] = [];
          bannerRes.docs.map((banner) => {
            banners.push({
              id: banner.id,
              ...banner.data(),
            } as Banner);
            this.nMobileBanners++;
          });
          this.mobileBannerSections.push({
            id: sec.id,
            ...sec.data(),
            banners,
          } as BannerSection);
        });
      });
      this.loader.hideLoader();
    });

    this.loader.showLoader();
    this.db.getDesktopBannerSettings().then((res) => {
      const data = res.data();
      if (data) {
        this.showDesktopBanners = data['show'];
      }
      this.loader.hideLoader();
    });

    this.loader.showLoader();
    this.db.getDesktopBannerSections().then((secRes) => {
      secRes.docs.map((sec) => {
        this.db.getDesktopBanners(sec.id).then((bannerRes) => {
          const banners: Banner[] = [];
          bannerRes.docs.map((banner) => {
            banners.push({
              id: banner.id,
              ...banner.data(),
            } as Banner);
            this.nDesktopBanners++;
          });
          this.desktopBannerSections.push({
            id: sec.id,
            ...sec.data(),
            banners,
          } as BannerSection);
        });
      });
      this.loader.hideLoader();
    });

    this.loader.showLoader();
    this.db.getContact().then((res) => {
      const contact = res.data();
      if (contact) {
        this.mobileNumbersInDb = contact['mobileNumbers'];
        this.whatsappNumbersInDb = contact['whatsappNumbers'];
        this.emailsInDb = contact['emails'];
        this.timePeriodInDb = contact['timePeriod'];
        this.mobileNumbers = [...this.mobileNumbersInDb];
        this.whatsappNumbers = [...this.whatsappNumbersInDb];
        this.emails = [...this.emailsInDb];
        this.timePeriod = this.timePeriodInDb;
      }
      this.loader.hideLoader();
    });

    this.loader.showLoader();
    this.db.getCancellation().then((res) => {
      const cancellation = res.data();
      if (cancellation) {
        this.gracePeriodInDb = cancellation['gracePeriod'];
        this.chargeTypeInDb = cancellation['chargeType'];
        this.chargeValueInDb = cancellation['chargeValue'];
        this.gracePeriod = this.gracePeriodInDb;
        this.chargeType = this.chargeTypeInDb;
        this.chargeValue = this.chargeValueInDb;
      }
      this.loader.hideLoader();
    });

    this.loader.showLoader();
    this.db.getFaqSettings().then((res) => {
      const data = res.data();
      if (data) {
        this.showFaqs = data['show'];
      }
      this.loader.hideLoader();
    });

    this.loader.showLoader();
    this.db.getFaqs().then((res) => {
      res.docs.map((doc) => {
        this.faqs.push({
          id: doc.id,
          ...doc.data(),
        } as FAQ);
      });
      this.loader.hideLoader();
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  setAllMobileBannersShow(show: boolean) {
    this.loader.showLoader();
    this.db
      .updateMobileBannerSettings({
        show,
      })
      .then(() => {
        this.showMobileBanners = show;
        if (show) {
          this.alertify.presentSuccessToast(
            'Mobile banners are now visible to customers'
          );
        } else {
          this.alertify.presentSuccessToast(
            'Mobile banners are now hidden from customers'
          );
        }
        this.loader.hideLoader();
      });
  }

  addMobileBanner({ sectionIndex }: any) {
    const sectionId = this.mobileBannerSections[sectionIndex].id;
    this.dialog
      .open(BannerDialogComponent, {
        width: this.dialogWidth,
        maxWidth: this.dialogMaxWidth,
        data: {
          sectionId,
          bannerType: 'mobile',
        },
      })
      .afterClosed()
      .subscribe((banner: Banner) => {
        if (banner) {
          this.loader.showLoader();
          this.db.addMobileBanner(sectionId, banner).then((res) => {
            banner.id = res['id'];
            this.mobileBannerSections[sectionIndex].banners.push(banner);
            this.nMobileBanners++;
            this.alertify.presentSuccessToast('Mobile banner added!');
            this.loader.hideLoader();
          });
        }
      });
  }

  setMobileBannerSectionShow({ sectionIndex, show }: any) {
    const sectionId = this.mobileBannerSections[sectionIndex].id;
    this.loader.showLoader();
    this.db
      .updateMobileBannerSectionSettings(sectionId, {
        show,
      } as BannerSectionSettings)
      .then(() => {
        this.mobileBannerSections[sectionIndex].show = show;
        if (show) {
          this.alertify.presentSuccessToast(
            'This mobile banner section is now visible to customers'
          );
        } else {
          this.alertify.presentSuccessToast(
            'This mobile banner section is now hidden from customers'
          );
        }
        this.loader.hideLoader();
      });
  }

  setMobileBannerShow({ sectionIndex, bannerIndex, show }: any) {
    const section = this.mobileBannerSections[sectionIndex];
    const bannerId = section.banners[bannerIndex].id;
    this.loader.showLoader();
    this.db
      .updateMobileBanner(section.id, bannerId, {
        show,
      } as Banner)
      .then(() => {
        this.mobileBannerSections[sectionIndex].banners[bannerIndex].show =
          show;
        if (show) {
          this.alertify.presentSuccessToast(
            'This mobile banner is now visible to customers'
          );
        } else {
          this.alertify.presentSuccessToast(
            'This mobile banner is now hidden from customers'
          );
        }
        this.loader.hideLoader();
      });
  }

  editMobileBanner({ sectionIndex, bannerIndex }: any) {
    const section = this.mobileBannerSections[sectionIndex];
    this.dialog
      .open(BannerDialogComponent, {
        width: this.dialogWidth,
        maxWidth: this.dialogMaxWidth,
        data: {
          sectionId: section.id,
          banner: section.banners[bannerIndex],
          bannerType: 'mobile',
        },
      })
      .afterClosed()
      .subscribe((banner: Banner) => {
        if (banner) {
          this.loader.showLoader();
          this.db.updateMobileBanner(section.id, banner.id, banner).then(() => {
            this.mobileBannerSections[sectionIndex].banners[bannerIndex] =
              banner;
            this.alertify.presentSuccessToast('Mobile banner updated!');
            this.loader.hideLoader();
          });
        }
      });
  }

  deleteMobileBanner({ sectionIndex, bannerIndex }: any) {
    this.dialog
      .open(DeleteDialogComponent, {
        width: this.dialogWidth,
        maxWidth: this.dialogMaxWidth,
        data: {
          item: 'mobile banner',
        }
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          const section = this.mobileBannerSections[sectionIndex];
          const banner = section.banners[bannerIndex];
          this.loader.showLoader();
          this.storageService.deleteFileFromPath(
            `customer-settings/banners/section-${section.id}/${banner.fileName}`
          );
          this.db.deleteMobileBanner(section.id, banner.id).then(() => {
            this.mobileBannerSections[sectionIndex].banners.splice(
              bannerIndex,
              1
            );
            this.nMobileBanners--;
            this.alertify.presentSuccessToast('Mobile banner deleted!');
            this.loader.hideLoader();
          });
        }
      });
  }

  setAllDesktopBannersShow(show: boolean) {
    this.loader.showLoader();
    this.db
      .updateDesktopBannerSettings({
        show,
      })
      .then(() => {
        this.showDesktopBanners = show;
        if (show) {
          this.alertify.presentSuccessToast(
            'Desktop banners are now visible to customers'
          );
        } else {
          this.alertify.presentSuccessToast(
            'Desktop banners are now hidden from customers'
          );
        }
        this.loader.hideLoader();
      });
  }

  addDesktopBanner({ sectionIndex }: any) {
    const sectionId = this.desktopBannerSections[sectionIndex].id;
    this.dialog
      .open(BannerDialogComponent, {
        width: this.dialogWidth,
        maxWidth: this.dialogMaxWidth,
        data: {
          sectionId,
          bannerType: 'desktop',
        },
      })
      .afterClosed()
      .subscribe((banner: Banner) => {
        if (banner) {
          this.loader.showLoader();
          this.db.addDesktopBanner(sectionId, banner).then((res) => {
            banner.id = res['id'];
            this.desktopBannerSections[sectionIndex].banners.push(banner);
            this.nDesktopBanners++;
            this.alertify.presentSuccessToast('Desktop banner added!');
            this.loader.hideLoader();
          });
        }
      });
  }

  setDesktopBannerSectionShow({ sectionIndex, show }: any) {
    const sectionId = this.desktopBannerSections[sectionIndex].id;
    this.loader.showLoader();
    this.db
      .updateDesktopBannerSectionSettings(sectionId, {
        show,
      } as BannerSectionSettings)
      .then(() => {
        this.desktopBannerSections[sectionIndex].show = show;
        if (show) {
          this.alertify.presentSuccessToast(
            'This desktop banner section is now visible to customers'
          );
        } else {
          this.alertify.presentSuccessToast(
            'This desktop banner section is now hidden from customers'
          );
        }
        this.loader.hideLoader();
      });
  }

  setDesktopBannerShow({ sectionIndex, bannerIndex, show }: any) {
    const section = this.desktopBannerSections[sectionIndex];
    const bannerId = section.banners[bannerIndex].id;
    this.loader.showLoader();
    this.db
      .updateDesktopBanner(section.id, bannerId, {
        show,
      } as Banner)
      .then(() => {
        this.desktopBannerSections[sectionIndex].banners[bannerIndex].show =
          show;
        if (show) {
          this.alertify.presentSuccessToast(
            'This desktop banner is now visible to customers'
          );
        } else {
          this.alertify.presentSuccessToast(
            'This desktop banner is now hidden from customers'
          );
        }
        this.loader.hideLoader();
      });
  }

  editDesktopBanner({ sectionIndex, bannerIndex }: any) {
    const section = this.desktopBannerSections[sectionIndex];
    this.dialog
      .open(BannerDialogComponent, {
        width: this.dialogWidth,
        maxWidth: this.dialogMaxWidth,
        data: {
          sectionId: section.id,
          banner: section.banners[bannerIndex],
          bannerType: 'desktop',
        },
      })
      .afterClosed()
      .subscribe((banner: Banner) => {
        if (banner) {
          this.loader.showLoader();
          this.db
            .updateDesktopBanner(section.id, banner.id, banner)
            .then(() => {
              this.desktopBannerSections[sectionIndex].banners[bannerIndex] =
                banner;
              this.alertify.presentSuccessToast('Desktop banner updated!');
              this.loader.hideLoader();
            });
        }
      });
  }

  deleteDesktopBanner({ sectionIndex, bannerIndex }: any) {
    this.dialog
      .open(DeleteDialogComponent, {
        width: this.dialogWidth,
        maxWidth: this.dialogMaxWidth,
        data: {
          item: 'desktop banner',
        }
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          const section = this.desktopBannerSections[sectionIndex];
          const banner = section.banners[bannerIndex];
          this.loader.showLoader();
          this.storageService.deleteFileFromPath(
            `customer-settings/banners/section-${section.id}/${banner.fileName}`
          );
          this.db.deleteDesktopBanner(section.id, banner.id).then(() => {
            this.desktopBannerSections[sectionIndex].banners.splice(
              bannerIndex,
              1
            );
            this.nDesktopBanners--;
            this.alertify.presentSuccessToast('Desktop banner deleted!');
            this.loader.hideLoader();
          });
        }
      });
  }

  areContactsChanged() {
    return (
      this.mobileNumbersInDb.toString() !== this.mobileNumbers.toString() ||
      this.whatsappNumbersInDb.toString() !== this.whatsappNumbers.toString() ||
      this.emailsInDb.toString() !== this.emails.toString()
    );
  }

  saveContacts() {
    for (const email of this.emails) {
      if (email && !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        this.alertify.presentErrorToast('Please enter valid emails!');
        return;
      }
    }
    this.loader.showLoader();
    this.db
      .updateContactSettings({
        mobileNumbers: this.mobileNumbers,
        whatsappNumbers: this.whatsappNumbers,
        emails: this.emails,
      } as ContactSettings)
      .then(() => {
        this.mobileNumbersInDb = this.mobileNumbers;
        this.whatsappNumbersInDb = this.whatsappNumbers;
        this.emailsInDb = this.emails;
        this.mobileNumbers = [...this.mobileNumbersInDb];
        this.whatsappNumbers = [...this.whatsappNumbersInDb];
        this.emails = [...this.emailsInDb];
        this.alertify.presentSuccessToast('Contacts updated!');
        this.loader.hideLoader();
      });
  }

  cancelContacts() {
    this.mobileNumbers = [...this.mobileNumbersInDb];
    this.whatsappNumbers = [...this.whatsappNumbersInDb];
    this.emails = [...this.emailsInDb];
  }

  isTimePeriodChanged() {
    return this.timePeriodInDb !== this.timePeriod;
  }

  saveTime() {
    if (this.timePeriod < 0) {
      this.alertify.presentErrorToast('Please enter a valid time period!');
      return;
    }
    this.loader.showLoader();
    this.db
      .updateContactSettings({
        timePeriod: this.timePeriod,
      } as ContactSettings)
      .then(() => {
        this.timePeriodInDb = this.timePeriod;
        this.alertify.presentSuccessToast('Time period updated!');
        this.loader.hideLoader();
      });
  }

  cancelTime() {
    this.timePeriod = this.timePeriodInDb;
  }

  isCancellationChanged() {
    return (
      this.gracePeriodInDb !== this.gracePeriod ||
      this.chargeTypeInDb !== this.chargeType ||
      this.chargeValueInDb !== this.chargeValue
    );
  }

  saveCancellation() {
    if (this.gracePeriod < 0) {
      this.alertify.presentErrorToast('Please enter a valid grace period!');
      return;
    }
    if (this.chargeType !== 'percent' && this.chargeType !== 'fixed') {
      this.alertify.presentErrorToast('Please select a valid charge type!');
      return;
    }
    if (this.chargeValue < 0) {
      this.alertify.presentErrorToast('Please enter a valid charge value!');
      return;
    }
    this.loader.showLoader();
    this.db
      .updateCancellationSettings({
        gracePeriod: this.gracePeriod,
        chargeType: this.chargeType,
        chargeValue: this.chargeValue,
      })
      .then(() => {
        this.gracePeriodInDb = this.gracePeriod;
        this.chargeTypeInDb = this.chargeType;
        this.chargeValueInDb = this.chargeValue;
        this.alertify.presentSuccessToast('Cancellation settings updated!');
        this.loader.hideLoader();
      });
  }

  cancelCancellation() {
    this.gracePeriod = this.gracePeriodInDb;
    this.chargeType = this.chargeTypeInDb;
    this.chargeValue = this.chargeValueInDb;
  }

  addFaq() {
    this.dialog
      .open(FAQDialogComponent, {
        width: this.dialogWidth,
        maxWidth: this.dialogMaxWidth,
      })
      .afterClosed()
      .subscribe((faq: FAQ) => {
        if (faq) {
          this.loader.showLoader();
          this.db.addFaq(faq).then((res) => {
            faq.id = res['id'];
            this.faqs.push(faq);
            this.alertify.presentSuccessToast('FAQ added!');
            this.loader.hideLoader();
          });
        }
      });
  }

  setAllFaqsShow(show: boolean) {
    this.loader.showLoader();
    this.db
      .updateFaqSettings({
        show,
      })
      .then(() => {
        this.showFaqs = show;
        if (show) {
          this.alertify.presentSuccessToast(
            'FAQs are now visible to customers'
          );
        } else {
          this.alertify.presentSuccessToast(
            'FAQs are now hidden from customers'
          );
        }
        this.loader.hideLoader();
      });
  }

  setFaqShow(faqIndex: number, show: boolean) {
    const faqId = this.faqs[faqIndex].id;
    this.loader.showLoader();
    this.db.updateFaq(faqId, { show } as FAQ).then(() => {
      this.faqs[faqIndex].show = show;
      if (show) {
        this.alertify.presentSuccessToast(
          'This FAQ is now visible to customers'
        );
      } else {
        this.alertify.presentSuccessToast(
          'This FAQ is now hidden from customers'
        );
      }
      this.loader.hideLoader();
    });
  }

  editFaq(faqIndex: number) {
    this.dialog
      .open(FAQDialogComponent, {
        width: this.dialogWidth,
        maxWidth: this.dialogMaxWidth,
        data: {
          faq: this.faqs[faqIndex],
        },
      })
      .afterClosed()
      .subscribe((faq: FAQ) => {
        if (faq) {
          this.loader.showLoader();
          this.db.updateFaq(faq.id, faq).then(() => {
            this.faqs[faqIndex] = faq;
            this.alertify.presentSuccessToast('FAQ updated!');
            this.loader.hideLoader();
          });
        }
      });
  }

  deleteFaq(faqIndex: number) {
    this.dialog
      .open(DeleteDialogComponent, {
        width: this.dialogWidth,
        maxWidth: this.dialogMaxWidth,
        data: {
          item: 'FAQ',
        }
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          const faq = this.faqs[faqIndex];
          this.loader.showLoader();
          this.db.deleteFaq(faq.id).then(() => {
            this.faqs.splice(faqIndex, 1);
            this.alertify.presentSuccessToast('FAQ deleted!');
            this.loader.hideLoader();
          });
        }
      });
  }

  openAddBookingCharges(data: any) {
    this.dialog.open(BookingChargesComponent, {
      data,
      width: '50vw',
      height: '50vh'
    }).afterClosed()
    .subscribe(async (data) => {
      this.getCharges();
    });
  }

  charges: any[] = [];
  async getCharges() {
    await this.db.getCharges().then((data) => {
      this.charges = data.docs.map((charge: any) => {
        return { ...charge.data(), id: charge.id };
      })
    })
  }

  delCharge(id: string) {
    this.dialog.open(ConfirmationDialogComponent, { data: { message: 'Are you sure?' } })
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
            await this.db.deleteCharge(id);
            this.getCharges();
          }
      });
  }

  async updChargeStatus(id: string, status: boolean) {
    await this.db.updateCharges({id, active: status});
    this.getCharges();
  }
}
