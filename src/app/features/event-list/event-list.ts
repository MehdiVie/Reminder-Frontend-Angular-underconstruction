import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventDialog } from '../event-dialog/event-dialog';
import { EventService } from '../../core/services/event.service';
import { AuthService } from '../../core/services/auth.service';
import { Event } from '../../core/models/event.model';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule , MatProgressSpinnerModule, RouterModule , MatDialogModule ],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = [];
  events: Event[] = [];
  

  constructor(private eventService: EventService , 
              private dialog: MatDialog,
              private route : ActivatedRoute) {}


  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    this.displayedColumns = ['id', 'title', 'description', 'eventDate', 'reminderTime', 'actions'];
    if (idParam) {
      const id = Number(idParam);
      console.log("Detected id from the route : ", id);
      this.getEvent(id);
    }
    else {
      this.loadEvents();
    }
    
  }

  loadEvents() {

      this.eventService.getAll().subscribe({
      next: (res) => {
        console.log('Events received from backend:', res.data);
        this.events = res.data;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
    }


  getEvent(id : number) {
    this.eventService.getById(id).subscribe({
      next: (res) => {
        console.log('Event data:', res.data);
        this.events = [res.data];
      },
      error: (err) => console.error('Error fetching single event:', err)
    });
  }


  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.delete(id).subscribe({
        next: () => this.loadEvents(),
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }
  editEvent(event: Event) {
    const dialogRef = this.dialog.open(EventDialog, {
      width : '600px' ,
      data : { ...event }
    });
    dialogRef.afterClosed().subscribe((changed) => {
    if (changed) {
      this.loadEvents(); // only in success get the list
    }
    });

  }

  showEvent(event: Event) {
    const dialogRef = this.dialog.open(EventDialog, {
      width : '600px' ,
      data : { ...event , readonly: true}
    });
  }
  
  addEvent() {
    const dialogRef= this.dialog.open(EventDialog , {
      width : '600px' ,
      data : {} // no data , we want to make a new data
    });
    dialogRef.afterClosed().subscribe(changed => {
      if (changed) {
        this.loadEvents(); // only in success get the list
      }
    })
  }

}
