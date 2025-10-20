import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EventDialog } from '../event-dialog/event-dialog';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../core/models/event.model';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description' , 'eventDate', 'reminderTime' , 'actions'];
  events: Event[] = [];
  isLoading = true;

  constructor(private eventService: EventService , private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAll().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.isLoading = false;
      },
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
      width : '500px' ,
      data : { ...event }
    });
    dialogRef.afterClosed().subscribe((changed) => {
    if (changed) {
      this.loadEvents(); // only in success get the list
    }
    });

  }

}
