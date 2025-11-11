import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";



export const authInterceptor : HttpInterceptorFn = (req , next) => {

    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();


    // attach JWT token to request if exists
    if (token) {
        req = req.clone({
            setHeaders : {
                Authorization : `Bearer ${token}` ,
            },
        });

    } 

    // Handle errors globally (401 / 403)
    return next(req).pipe(
        catchError((error : HttpErrorResponse) => {
            if (error.status == 401 || error.status == 403) {
                console.warn("[AuthInterceptor] Unauthorized or forbidden → logging out.");
                authService.logout();
                router.navigate(["/login"]);
            }
            return throwError(()=> error);
        })
    )
 
}