import { Component, OnInit } from "@angular/core";
import { AreaWiseCatalogueService } from "./area-wise-catalogue.service";
import {
  Area,
  Areas,
  extendedAreas,
  extendedSubArea,
} from "./area-wise-catalogue.structure";
import { Subscription } from "rxjs";
import { ServiceCatalogueService } from "../service-catalogues/service-catalogue.service";
import { NotificationService } from "../Shared/core/notification.service";
import { MatDialog } from "@angular/material/dialog";
import { AddAreaComponent } from "./modal/add-area/add-area.component";
import { AddCityComponent } from "./modal/add-city/add-city.component";
import { ConfirmationDialogComponent } from "../Shared/dialog/dialog.component";
import { AuthService } from "../auth/auth.service";
@Component({
  selector: "app-area-wise-catalogue",
  templateUrl: "./area-wise-catalogue.component.html",
  styleUrls: ["./area-wise-catalogue.component.scss"],
})
export class AreaWiseCatalogueComponent implements OnInit {
  areas: any = [];
  serviceCatalogues: any = [];
  citySubs: Subscription | undefined;
  areaSubs: Subscription | undefined;
  statesList: any = [];
  selectedArea: any;
  constructor(
    private areaWiseCatalogueService: AreaWiseCatalogueService,
    private serviceCatalogueService: ServiceCatalogueService,
    private alertify: NotificationService,
    private dialog: MatDialog,
    public AuthService : AuthService
  ) {
    this.getDefaultData();
    this.getCatalogues();
  }

  ngOnInit(): void {}

  get totalCities() {
    return this.areas.length;
  }

  get activeCities() {
    return this.areas.filter((area: Areas) => area.cityActive).length;
  }

  get totalAreas() {
    return this.areas.reduce((acc: number, area: Areas) => {
      acc = acc + (area?.areas ? area?.areas?.length : 0);
      return acc;
    }, 0);
  }

  get activeAreas() {
    return this.areas.reduce((acc: number, area: Areas) => {
      acc =
        acc +
        (area?.areas
          ? area?.areas?.reduce((acc1: number, area: Area) => {
              acc1 = acc1 + (area.active ? 1 : 0);
              return acc1;
            }, 0)
          : 0);
      return acc;
    }, 0);
  }

  getActiveAreas(areas: Area[]) {
    return areas ? areas.filter((area: Area) => area.active).length : 0;
  }

  async getDefaultData() {
    await this.areaWiseCatalogueService
      .getStateSubscription()
      .subscribe(async (states) => {
        this.areas = [];
        states.map(async (state) => {
          let stateData = state as extendedAreas;
          this.statesList.push({ ...stateData });
          stateData.subscription?.unsubscribe();
          this.citySubs = await this.areaWiseCatalogueService
            .getCitySubscription(state["id"])
            .subscribe(async (cities) => {
              await cities.map(async (city) => {
                let areaData = {} as Areas;
                areaData["state"] = state["state"];
                areaData["stateId"] = state["id"];
                areaData["stateActive"] = state["active"];
                areaData["city"] = city["name"];
                areaData["cityId"] = city["id"];
                areaData["cityActive"] = city["active"];

                let cityData = city as extendedSubArea;
                cityData.subscription?.unsubscribe();
                this.areaSubs = await this.areaWiseCatalogueService
                  .getAreaSubscription(state["id"], city["id"])
                  .subscribe(async (areas) => {
                    areaData.areas = areas as Area[];
                    // this.areaSubs?.unsubscribe();
                  });
                this.areas.push(areaData);
                return cityData;
              });
              this.citySubs?.unsubscribe();
            });
        });
      });
  }

  async changeCityStatus(stateId: string, cityId: string, status: boolean) {
    await this.areaWiseCatalogueService.updateCityStatus(
      stateId,
      cityId,
      status
    );
    this.areas = this.areas.map((area: any) => {
      if (area.cityId === cityId.trim()) {
        area.cityActive = status;
      }
      return area;
    });
  }

  async changeAreaStatus(
    stateId: string,
    cityId: string,
    areaId: string,
    status: boolean
  ) {
    await this.areaWiseCatalogueService.updateAreaStatus(
      stateId,
      cityId,
      areaId,
      status
    );
    this.areas = this.areas.map((city: Areas) => {
      if (city.cityId === cityId) {
        city.areas = city.areas.map((area: any) => {
          if (area.id == areaId.trim()) {
            area.active = status;
          }
          return area;
        });
      }
      return city;
    });
  }

  async getCatalogues() {
    await this.serviceCatalogueService
      .getServiceCatalogue()
      .then((catalogues) => {
        this.serviceCatalogues = catalogues.docs.map((catalogue) => {
          return { ...catalogue.data(), id: catalogue.id };
        });
      });
  }

  async updateAreaCatalogue(
    $event: any,
    stateId: string,
    cityId: string,
    areaId: string
  ) {
    await this.areaWiseCatalogueService.updateAreaCatalogue(
      stateId,
      cityId,
      areaId,
      $event.value
    );
    this.alertify.presentSuccessToast("Successfully Updated");
  }

  openAddAreaModal(city: any) {
    this.selectedArea = city;
    const modalData = {
      selectedArea: this.selectedArea,
      serviceCatalogues: this.serviceCatalogues,
    };
    this.dialog
      .open(AddAreaComponent, {
        data: { ...modalData },
        width: "40vw",
      })
      .afterClosed()
      .subscribe(() => {
        this.getDefaultData();
      });
  }

  openAddCityModal() {
    this.dialog
      .open(AddCityComponent, {
        data: { data: this.statesList },
        width: "40vw",
      })
      .afterClosed()
      .subscribe(() => {
        this.getDefaultData();
      });
  }

  deleteCity(stateId: string, cityId: string) {
    this.dialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
          await this.areaWiseCatalogueService.deleteCity(stateId, cityId);
          this.getDefaultData();
        }
      });
  }

  deleteArea(stateId: string, cityId: string, areaId: string) {
    this.dialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
          await this.areaWiseCatalogueService.deleteArea(
            stateId,
            cityId,
            areaId
          );
          this.getDefaultData();
        }
      });
  }
}
