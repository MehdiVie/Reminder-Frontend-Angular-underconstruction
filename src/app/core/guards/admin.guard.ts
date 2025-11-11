import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";


@Injectable({
    providedIn : 'root'
})

export class AdminGuard implements CanActivate {

    constructor(private auth : AuthService , private router : Router) {}

    canActivate() : boolean {
        if (this.auth.hasRole("ADMIN")) {
            return true;
        }
        this.router.navigate(["/events"]);
        return false;
    }
        
    
}