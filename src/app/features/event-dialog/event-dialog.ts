import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-event-dialog',
  imports: [
    CommonModule ,
    ReactiveFormsModule , 
    MatFormFieldModule ,
    MatInputModule ,
    MatButtonModule ,
    MatDialogModule
  ],
  templateUrl: './event-dialog.html',
  styleUrls: ['./event-dialog.css']
})
export class EventDialog {
  form : FormGroup;
  backendErrors : any = {};
  isSaving = false;

  constructor (
    private fb : FormBuilder ,
    private dialogRef: MatDialogRef<EventDialog> ,
    private eventService : EventService ,
    private cdr : ChangeDetectorRef ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     this.form = this.fb.group ({
        title : [data.title , Validators.required] ,
        description : [data.description] , 
        eventDate : [this.normalizeDate(data.eventDate) , Validators.required] ,
        reminderTime : [this.normalizeDateTimeLocal(data.reminderTime)] 
     })
  }

  // yyy-mm-dd
  private normalizeDate(val: string | null): string {
    if (!val) return '';
    return typeof val == 'string' ? val.substring(0,10) : '';
  }

  // yyyy-mm-ddTHH:mm
  private normalizeDateTimeLocal(val: string | null) : string {
    if (!val) return '';

    // (2025-10-19T20:30:00.000+02:00 -> 2025-10-19T20:30)
    const cleaned = val.replace(/\.\d+.*$/, '').replace(/\+\d{2}:\d{2}$/, '');

    // only return date-time with hours and seconds (yyyy-mm-dd HH:mm)
    return cleaned.substring(0, 16);
  }

  // minEventDate & minReminderTime
  get minEventDate() : string {
    const d = new Date(Date.now() + 24*60*60*1000); // tomorrow date
    return d.toISOString().split('T')[0];
  }

  get minReminderTime() : string {
    return new Date().toISOString().substring(0,16); // yyyy-mm-ddTHH:mm (without second)
  }

  save() {
    if (this.form.invalid) return;

    // make data for backend
    const payload = { ...this.form.value };

    // eventDate -> yyyy-mm-dd
    payload.eventDate = (payload.eventDate as string).substring(0,10);

    // Format reminderTime as full ISO
      if (payload.reminderTime) {

        if ((payload.reminderTime as string).length==16) {
          // Cut milliseconds to match LocalDateTime format ('yyyy-mm-dd HH:mm:ss')
          payload.reminderTime = payload.reminderTime + ":00";
        }

        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.
                                      test(payload.reminderTime)) {
          this.backendErrors = { ...this.backendErrors, reminderTime: 'Invalid datetime format' };
          //return;
        }
        
        const eventDate = new Date(payload.eventDate);
        const reminderDate = new Date(payload.reminderTime.substring(0,10));
        //console.log(eventDate);
        //console.log(reminderDate);

        if (reminderDate >= eventDate) {
          this.backendErrors = {...this.backendErrors , reminderTime : 'ReminderTime must be before EventDate.'};
        //return;
        }
        
      }



      this.isSaving=true;
      this.backendErrors = {};

      const $request = this.data.id ? 
                       this.eventService.update(this.data.id,payload) :
                       this.eventService.create(payload);

      $request.subscribe({
        next: () => {
          this.isSaving=false;
          this.dialogRef.close(true); // success, close dialog! and tell it to list
        },
        error : (err) => {
          this.isSaving=false;
          // show errors from backend-validation in from
          if(err?.error?.data) {
            this.backendErrors = err.error.data as Record <string,string>;

            // eventDate
            if (this.backendErrors.eventDate) {
              const c = this.form.get('eventDate');
              c?.setErrors({ backend: true});
              c?.markAsTouched();
            }

            // reminderTime
            if (this.backendErrors.reminderTime) {
              const c = this.form.get('reminderTime');
              c?.setErrors({ backend: true });
              c?.markAsTouched();
            }


          } else {
            this.backendErrors = {_global: err?.error?.message 
                                            || 'save failed'};
          }
          
          this.cdr.detectChanges();
        }

      });

    
  }

  cancel() {
    this.dialogRef.close();
  }
}
