import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BannerSection } from '../banner.structure';

@Component({
  selector: 'app-banner-section',
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss'],
})
export class BannerSectionComponent {
  @Input() bannerSections: BannerSection[] = [];

  @Output() addBanner = new EventEmitter<{
    sectionIndex: number;
  }>();
  @Output() switchBannerSectionShow = new EventEmitter<{
    sectionIndex: number;
    show: boolean;
  }>();
  @Output() switchBannerShow = new EventEmitter<{
    sectionIndex: number;
    bannerIndex: number;
    show: boolean;
  }>();
  @Output() editBanner = new EventEmitter<{
    sectionIndex: number;
    bannerIndex: number;
  }>();
  @Output() deleteBanner = new EventEmitter<{
    sectionIndex: number;
    bannerIndex: number;
  }>();
}
