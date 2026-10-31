import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  // reports: any[] = [
  //   {
  //     icon:'analytics',
  //     title:'Order Report',
  //     description:'Daily Orders Report Bill Wise',
  //     link:'order-report'
  //   },
  //   {
  //     icon:'monitoring',
  //     title:'Customer Wise Report',
  //     description:'Daily Orders Report Customer Wise',
  //     link:'customer-report'
  //   },
  // ]
  // range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });
  ngOnInit(): void {
  }


  data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // openTable() {
  //   this.router.navigate(['table'], { relativeTo: this.route });
  // }
}
