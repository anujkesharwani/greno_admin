import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-booking-performance',
  templateUrl: './dashboard-booking-performance.component.html',
  styleUrls: ['./dashboard-booking-performance.component.scss']
})
export class DashboardBookingPerformanceComponent implements OnInit, OnChanges {
  @Input() chartData = [
    { service: 'Booking Left', value: 36, color: '#0074C1' },
    { service: 'Booking Complete', value: 64, color: '#056230' },
  ];

  total:number = 0;
  data = {
    labels: this.chartData.map(x => x.service),
    datasets: [{
      data: this.chartData.map(x => x.value),
      backgroundColor: this.chartData.map(x => x.color),
      hoverOffset: 4
    }]
  };
  mainChart:any;

  ngOnInit() {
    this.total = this.chartData.reduce((acc,curr) => acc + curr.value,0);
    this.mainChart = new Chart(
      "myChart2",
      {
        type: 'doughnut',
        data: this.data,
        options: {
          plugins: {
            legend: {
              display: false,
              // labels: {
              //   color: 'rgb(255, 99, 132)'
              // }
            }
          }
        }
      }
    );
  }

  ngOnChanges(): void {
    if (this.mainChart){
      this.mainChart.data = {
        labels: this.chartData.map(x => x.service),
        datasets: [{
          data: this.chartData.map(x => x.value),
          backgroundColor: this.chartData.map(x => x.color),
          hoverOffset: 4
        }]
      };
      this.total = this.chartData.reduce((acc,curr) => acc + curr.value,0);
      this.mainChart.update();
    }
  }
}
