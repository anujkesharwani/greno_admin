import { Component } from '@angular/core';
import { ServiceCatalogueService } from './service-catalogue.service';
import { ServiceCatalogue } from './service-category.structure';
import { MatDialog } from '@angular/material/dialog';
import { ServiceComponent } from '../service/service.component';
import { ConfirmationDialogComponent } from '../Shared/dialog/dialog.component';
import Utils from '../Shared/shared-services/util';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../Shared/core/notification.service';
import { AreaWiseCatalogueService } from '../area-wise-catalogue/area-wise-catalogue.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-service-catalogues',
  templateUrl: './service-catalogues.component.html',
  styleUrls: ['./service-catalogues.component.scss']
})
export class ServiceCataloguesComponent {
  serviceCatalogues: any = [];
  utils = Utils;

  constructor(
    private serviceCatalogueService: ServiceCatalogueService,
    private dialog: MatDialog,
    private http: HttpClient,
    private notification: NotificationService,
    private areaService: AreaWiseCatalogueService,
    public AuthService:AuthService
  ) {
    this.getCatalogues();
  }

  get activeCount() {
    return this.serviceCatalogues.filter((slot: any) => slot.active).length;
  }

  get useCount() {
    return 0;
  }

  async getCatalogues() {
    await this.serviceCatalogueService.getServiceCatalogue().then((catalogues) => {
      this.serviceCatalogues = catalogues.docs.map((catalogue) => {
        return { ...catalogue.data(), id: catalogue.id };
      })
    });
  }

  async changeStatus(id: string, status: boolean) {
    await this.serviceCatalogueService.updateServiceCatalogueStatus(id, status);
    this.serviceCatalogues = this.serviceCatalogues.map((catalogue: any) => {
      if (catalogue.id === id) {
        catalogue.active = status;
      }
      return catalogue;
    });
  }

  deleteCatalogue(id: string) {
    this.dialog.open(ConfirmationDialogComponent, {data: {message: 'Are you sure?'}})
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
          const areasMapped = (await this.areaService.getAllAreas()).docs.map((area: any) => {
            return { ...area.data(), id: area.id }
          }).filter(area => area.serviceCatalogue === id);
          if (areasMapped.length > 0) {
            this.notification.presentErrorToast(
              'Could not be deleted. Service catalogue mapped to multiple areas'
            );
            return;
          } else {
            await this.serviceCatalogueService.deleteServiceCatalogue(id);
            this.getCatalogues();
          }
        }
      });
  }

  async makeCatalogueCopy(catalogue: ServiceCatalogue) {
    this.dialog.open(ConfirmationDialogComponent, {data: {message: 'Are you sure?'}})
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
          this.http.get(
            `${environment.firebase.functionURL}duplicateServiceCatalogue?id=${catalogue.id}`
          ).subscribe((data: any) => {
            if (data.err) {
              this.notification.presentErrorToast("Error copying Service Catalogue");
            } else {
              this.notification.presentSuccessToast("Service Catalogue copied successfully");
              this.getCatalogues();
            }
          })
        }
      });
  }

  catalogueModal(catalogue?: ServiceCatalogue) {
    this.dialog.open(ServiceComponent, {
      data: { ...catalogue },
      height: '90vh',
      width: '95vw',
      maxWidth: '95vw',
    })
    .afterClosed()
    .subscribe(() => { this.getCatalogues(); } );
  }

}
