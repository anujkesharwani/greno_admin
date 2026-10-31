import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.navigate(['general'], { relativeTo: this.route });
  }

  // tabChanged(event: any) {
  //   // console.log(event.index);
  //   switch (event.index) {
  //     case 0:
  //       this.router.navigate(['general'], { relativeTo: this.route });
  //       break;
  //     case 1:
  //       this.router.navigate(['content-management'], { relativeTo: this.route });
  //       break;
  //     case 2:
  //       this.router.navigate(['date-time'], { relativeTo: this.route });
  //       break;
  //     case 3:
  //       this.router.navigate(['policies'], { relativeTo: this.route });
  //       break;
  //   }
  // }
}
