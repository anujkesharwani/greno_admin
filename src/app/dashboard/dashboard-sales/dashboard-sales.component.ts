import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.scss']
})
export class DashboardSalesComponent implements OnInit, OnChanges {
  @Input() data = [
    { month: 'Jan', sales: 20 },
    { month: 'Feb', sales: 15 },
    { month: 'Mar', sales: 12 },
    { month: 'Apr', sales: 16 },
    { month: 'May', sales: 6 },
    { month: 'Jun', sales: 13 },
    { month: 'Jul', sales: 14 },
    { month: 'Aug', sales: 17 },
    { month: 'Sep', sales: 7 },
    { month: 'Oct', sales: 9 },
    { month: 'Nov', sales: 20 },
    { month: 'Dec', sales: 13 },
  ]
  mainChart:Chart|undefined;

  ngOnInit() {
    this.mainChart = new Chart(
      "myChart",
      {
        type: 'line',
        data: {
          labels: this.data.map((label) => label.month),
          datasets: [
            {
              // label: 'Acquisitions by year',
              data: this.data.map((data) => data.sales)
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false,
            }
          }
        }
      }
    );
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // update chart if the input data changes
    if (this.mainChart?.data.datasets[0]){
      this.mainChart.data = {
        labels: this.data.map((label) => label.month),
        datasets: [
          {
            // label: 'Acquisitions by year',
            data: this.data.map((data) => data.sales)
          }
        ]
      }
      // console.log("this.mainChart",this.mainChart.data);
      
      this.mainChart.update();
    }
  }
}
