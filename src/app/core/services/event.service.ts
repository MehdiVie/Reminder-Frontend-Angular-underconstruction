import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { ApiResponse } from '../models/apiResponse.model';
import { PageResponse } from '../models/pageResponse.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
private apiUrl = 'http://localhost:9090/api/events';

constructor(private http: HttpClient) {}

getPage(
  currentPage = 0 ,
  pageSize = 10 ,
  sortBy = 'id',
  direction : 'asc' | 'desc' = 'asc',
  afterDate?: string
) :  Observable<ApiResponse<PageResponse<Event>>> {
      currentPage = isNaN(currentPage) ? 0 : currentPage;
      pageSize = isNaN(pageSize) ? 1 : pageSize;
      let params = new HttpParams()
            .set('page',currentPage)
            .set('size',pageSize)
            .set('sortBy',sortBy)
            .set('direction',direction);

  return this.http.get<ApiResponse<PageResponse<Event>>>(`${this.apiUrl}/paged`, { params, });

}

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
