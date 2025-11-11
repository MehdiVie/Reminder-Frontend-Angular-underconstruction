import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/apiResponse.model";
import { AdminEvent } from "../models/adminEvent.model";


@Injectable({
    providedIn : "root"
})

export class AdminService {
    private readonly baseUrl = "http://localhost:9090/api/admin";

    constructor(private http: HttpClient) {}

    getAll() : Observable<ApiResponse<AdminEvent[]>> {
        return this.http.get<ApiResponse<AdminEvent[]>>(`${this.baseUrl}/events`);
    }

    getPendingReminders() : Observable<ApiResponse<AdminEvent[]>> {
        return this.http.get<ApiResponse<AdminEvent[]>>(`${this.baseUrl}/events/pending`);
    }

    sendReminder(id : number): Observable<ApiResponse<void>>  {
       return this.http.post<ApiResponse<void>>(`${this.baseUrl}/events/${id}/send-reminder`, {});
    }

    getStats() : Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.baseUrl}/stats`);
    }
}