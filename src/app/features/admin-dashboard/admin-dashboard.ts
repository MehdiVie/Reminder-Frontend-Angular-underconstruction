import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, MatIconModule, MatCardModule, BaseChartDirective ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent implements OnInit {
stats : any = null;
loading = true;

lineChartData : ChartConfiguration<'line'>['data'] = {
  labels: [],
  datasets : [
    {
      data : [] ,
      label : 'Events per day' ,
      fill : true ,
      tension : 0.3 ,
      pointRadius : 4
    }
  ]
}

lineChartOPtions : ChartConfiguration<'line'>['options'] = {
  responsive : true ,
  plugins: {
    legend: {
      display : true
    }
  }
}



constructor(private adminService : AdminService){}

ngOnInit() : void {
  this.adminService.getStats().subscribe({
    next : (res) => {
      this.stats = res.data;
      this.loading = false;
      console.log("Stats received.", this.stats);
      this.prepareChart();
    } ,
    error : (err) => {
      console.log("Error fetching stats:", err);
      this.loading = false;
    }
  });
}

prepareChart() {
  const series = this.stats.eventsLast7Days as 
                          {'date' : string , 'count': number }[] | undefined;
  if (!series || series.length===0) {
    this.lineChartData.labels = [];
    this.lineChartData.datasets[0].data = [];
    return;
  }
  this.lineChartData.labels=series.map(d => d.date);
  this.lineChartData.datasets[0].data = series.map(d => d.count);
}


}
