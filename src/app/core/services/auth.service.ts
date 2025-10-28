import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest, RegisterRequest , LoginResponse } from "../models/user.model";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable ({
    providedIn : 'root'
})
export class AuthService {
    private readonly apiUrl = 'http://localhost:9090/api/auth';
    private readonly token_key = 'jwt' ;

    private currentUserEmail = new BehaviorSubject<string | null>(null);

    $currentUserEmail = this.currentUserEmail.asObservable();

    constructor(private http: HttpClient) {}

    login(data : LoginRequest) : Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data )
        .pipe(
            tap((res)=>{
            localStorage.setItem(this.token_key , res.data.token);
            this.currentUserEmail.next(res.data.email);
        }));
    }

    register (data : RegisterRequest) : Observable<LoginResponse> {
        return this.http.post<LoginResponse> (`${this.apiUrl}/register`,data);
    }

    saveToken(token : string) : void {
        
        localStorage.setItem(this.token_key,token);
    }

    getToken() : string | null {
        const token = localStorage.getItem(this.token_key);
        console.log("Token read from localStorage:", token);
        return token;
    }

    logout() : void {
        localStorage.removeItem(this.token_key);
    }
}