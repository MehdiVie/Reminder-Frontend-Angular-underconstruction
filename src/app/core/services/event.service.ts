import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:9090/api/events';

  constructor(private http: HttpClient) {}

getAll(): Observable<Event[]> {
  return this.http.get<{ data: Event[] }>(this.apiUrl).pipe(
    map(response => response.data) 
  );
}

create(event : Event) : Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}`,event);
}


update(id : number , event : Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
}



delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
