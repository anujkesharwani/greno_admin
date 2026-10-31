import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AreaWiseCatalogueService } from "../../area-wise-catalogue.service";
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Dialog } from "@angular/cdk/dialog";
import { NotificationService } from "src/app/Shared/core/notification.service";
import Utils from "src/app/Shared/shared-services/util";
import { GoogleMap, MapInfoWindow } from "@angular/google-maps";
import { Position } from "@capacitor/geolocation";
import { Geolocation } from "@capacitor/geolocation";

@Component({
  selector: "app-add-area",
  templateUrl: "./add-area.component.html",
  styleUrls: ["./add-area.component.scss"],
})
export class AddAreaComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  circleRadius: number = 100;

  areaAddForm: FormGroup = this.formBuilder.group({
    searchInput: ["", [Validators.required]],
    active: [true],
    category: ["", [Validators.required]],
    radius: new FormControl(100, [Validators.required]),
    cordinates: new FormControl({
      lat: "",
      lng: "",
    }),
  });

  //google map variable
  vertices: google.maps.LatLngLiteral[];
  currentPosition: google.maps.LatLngLiteral;
  marker: any;
  display: any;
  geocoder = new google.maps.Geocoder();
  zoom = 15;
  mapOptionsCircle: any = {
    fillColor: "rgba(255, 0, 0, 0.5)", // Fill color with alpha (transparency)
    fillOpacity: 0.53,
    clickable: true,
    strokeWeight: 2,
    strokeColor: "rgba(255, 0, 0, 0.9)",
  };
  //

  areaSearchList$!: Observable<any>;
  private areaSearchText$ = new Subject<string>();
  searchedAreaDetails: any;
  areaOptions: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private areaWiseCatalogueService: AreaWiseCatalogueService,
    private dialog: Dialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.areaSearchList$ = this.areaSearchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((areaInputValue) =>
        this.areaWiseCatalogueService.getAreaOnSearch(areaInputValue)
      )
    );

    this.areaSearchList$.subscribe((response) => {
      this.areaOptions = response.results;
    });

    this.marker = {
      position: {
        lat: this.currentPosition?.lat,
        lng: this.currentPosition?.lng,
      },
      label: {
        color: "red",
        text: "Selected Location",
      },
      title: "Selected Location",
    };
  }

  // set area circle of selected area
  setCircle() {
    this.circleRadius = parseInt(this.areaAddForm.value.radius);
  }
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.currentPosition = event.latLng.toJSON();
      this.setCircle();
      this.marker.position = this.currentPosition;
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  newPosition(event: any) {
    this.currentPosition = event.latLng.toJSON();
  }

  addAreaInCity() {
    this.searchedAreaDetails["active"] = this.areaAddForm.get("active")?.value;
    this.searchedAreaDetails["serviceCatalogue"] =
      this.areaAddForm.get("category")?.value;
      this.searchedAreaDetails["radius"]=this.areaAddForm.get("radius")?.value;
      this.searchedAreaDetails["cordinates"]=this.areaAddForm.get("cordinates")?.value;

    this.areaWiseCatalogueService
      .addAreaInCity(
        this.data.selectedArea.stateId,
        this.data.selectedArea.cityId,
        this.searchedAreaDetails
      )
      .then((response: any) => {
        this.notificationService.presentSuccessToast("Area added successfully");
        this.closeDialog();
      });
  }

  onAreaDropdownSelect(event: any) {
    const placeId = event.place_id;
    this.areaWiseCatalogueService
      .getAreaDetailByPlaceId(placeId)
      .subscribe((response: any) => {
        this.searchedAreaDetails = response.result;
        this.searchedAreaDetails = Utils.createDataForAddAreas(
          this.searchedAreaDetails
        );
      });

    this.currentPosition = {
      lat: event.geometry.location.lat,
      lng: event.geometry.location.lng,
    };
    this.areaAddForm.patchValue({ cordinates: this.currentPosition });
  }

  getAreaOnSearch(areaSearchInput: any) {
    areaSearchInput && this.areaSearchText$.next(areaSearchInput.target.value);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
