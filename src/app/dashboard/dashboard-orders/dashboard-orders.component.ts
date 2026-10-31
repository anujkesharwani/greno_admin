import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.scss']
})
export class DashboardOrdersComponent implements OnInit, OnChanges {
  @Input() chartData = [
    { service: 'Appliance Repair', value: 100, color: '#0074C1' },
    { service: 'Bathroom Cleaning', value: 100, color: '#056230' },
    { service: 'Kitchen Cleaning', value: 100, color: '#07777B' },
    { service: 'Full Home Cleaning', value: 100, color: '#471337' },
    { service: 'Sofa carpet Cleaning', value: 100, color: '#004564' },
    { service: 'Women Spa & Salon', value: 100, color: '#444444' },
    { service: 'Car Cleaning', value: 100, color: '#FAE8FF' },
    { service: 'Water Tank Cleaning', value: 100, color: '#C263A5' },
  ];
  mainChart:any;

  data = {
    labels: this.chartData.map(x => x.service),
    datasets: [{
      data: this.chartData.map(x => x.value),
      backgroundColor: this.chartData.map(x => x.color),
      hoverOffset: 4
    }]
  };

  ngOnInit() {
    this.mainChart = new Chart(
      "myChart1",
      {
        type: 'pie',
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
    if(this.mainChart){
      this.mainChart.data = {
        labels: this.chartData.map(x => x.service),
        datasets: [{
          data: this.chartData.map(x => x.value),
          backgroundColor: this.chartData.map(x => x.color),
          hoverOffset: 4
        }]
      };
      this.mainChart.update();
    }
  }

}
