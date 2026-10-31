import { Component, Input, ViewEncapsulation } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
})
export class ChartContainerComponent {
  @Input() center: boolean = false;
  @Input() title: string = '';
}
