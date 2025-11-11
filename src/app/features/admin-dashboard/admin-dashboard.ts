import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, MatIconModule , MatCardModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent implements OnInit {
stats : any = null;
loading = true;

constructor(private adminService : AdminService){}

ngOnInit() : void {
  this.adminService.getStats().subscribe({
    next : (res) => {
      this.stats = res.data;
      this.loading = false;
      console.log("Stats received.", this.stats);
    } ,
    error : (err) => {
      console.log("Error fetching stats:", err);
      this.loading = false;
    }
  });
}
}
