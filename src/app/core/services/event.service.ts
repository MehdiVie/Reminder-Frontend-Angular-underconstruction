import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/event.model';
import { ApiResponse } from '../models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
private apiUrl = 'http://localhost:9090/api/events';

constructor(private http: HttpClient) {}

getAll(): Observable<ApiResponse<Event[]>> {
  return this.http.get<ApiResponse<Event[]>>(this.apiUrl);
}

getById(id: number) : Observable<ApiResponse<Event>> {
  return this.http.get<ApiResponse<Event>>(`${this.apiUrl}/${id}`);
  
}

create(event : Event) : Observable<ApiResponse<Event>> {
    return this.http.post<ApiResponse<Event>>(this.apiUrl,event);
}


update(id : number , event : Event): Observable<ApiResponse<Event>> {
    return this.http.put<ApiResponse<Event>>(`${this.apiUrl}/${id}`, event);
}



delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
