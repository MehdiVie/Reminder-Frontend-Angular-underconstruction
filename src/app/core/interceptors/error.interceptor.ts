import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { catchError, throwError } from 'rxjs';

export const errorInterceptor : HttpInterceptorFn = (req,next) => {
    const router = inject(Router)
    const authService =inject(AuthService);

    return next(req).pipe(
        catchError( (error : HttpErrorResponse) => {
            console.error("[HTTP Error Interceptor] => ",error);
            
            if(error.status == 401) {
                
                alert("Session expired! Please Login again.");
                authService.logout();
                router.navigate(["/login"]);

            } 
            else if (error.status == 403) {
                
                alert("Access denied. You are not allowed to perform this action.");

            }
            else if (error.status == 0) {
                
                alert("Could not connect to server.Please check your backend.");

            }
            else {
                alert(`!Error ${error.status} : ${error.statusText}`)
            }

        // return observable error to propagate it downstream
        return throwError(() => error);

        })
    );
};