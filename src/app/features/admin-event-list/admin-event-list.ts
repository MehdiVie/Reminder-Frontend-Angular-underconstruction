import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventDialog } from '../event-dialog/event-dialog';
import { EventService } from '../../core/services/event.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AdminEvent } from '../../core/models/adminEvent.model';




@Component({
  selector: 'app-admin-event-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule , MatProgressSpinnerModule, RouterModule , MatDialogModule ],
  templateUrl: './admin-event-list.html',
  styleUrls: ['./admin-event-list.css']
})
export class AdminEventListComponent implements OnInit {
  displayedColumns: string[] = [];
  events: AdminEvent[] = [];
  
  constructor(private eventService: EventService , 
              private authService: AuthService ,
              private adminService: AdminService ,
              private dialog: MatDialog,
              private route : ActivatedRoute) {}


  ngOnInit() {
    this.displayedColumns = ['id', 'title', 'description', 'eventDate', 'reminderTime', 'reminderSent', 'reminderSentTime', 'userEmail', 'sendReminder']
    this.loadEvents();
  }

  loadEvents() {
      this.adminService.getAll().subscribe({
      next: (res) => {
        console.log('Events received from backend:', res.data);
        this.events = res.data;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
    
    }

    sendReminder(id : number) {
      if (confirm("Send Reminder for this Event?")) {
        this.adminService.sendReminder(id).subscribe({
          next : () => {
            alert("Reminder sent successfully.");
            this.loadEvents()
          } ,
          error : (err) => {
            console.error('Send reminder failed:', err)
          }
        })
      }
    }

  }

