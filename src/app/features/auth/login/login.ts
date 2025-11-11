import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../../app/core/services/auth.service"
import { Router } from "@angular/router";
import { LoginRequest } from "../../../core/models/user.model";
import { firstValueFrom } from "rxjs";

@Component ({
    selector : "app-login" , 
    standalone : true ,
    imports : [CommonModule , ReactiveFormsModule] , 
    templateUrl : "./login.html" ,
    styleUrls : ["./login.css"] 
})

export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private fb = inject(FormBuilder);

    errorMessage = signal<string>('');

    form = this.fb.group({
        email : ['', [Validators.required, Validators.email]] ,
        password : ['', [Validators.required]]
    })

    isSubmitting = signal(false);

    async onSubmit() {
        if (this.form.invalid) {
            this.errorMessage.set("Please enter valid email and password.");
            return;
        }
        this.isSubmitting.set(true);

        const data : LoginRequest = this.form.value as LoginRequest;

        try {
            const res = await firstValueFrom(this.authService.login(data));
            const token = res.data.token;
            this.authService.saveToken(token);

            const payload = JSON.parse(atob(token.split('.')[1]));
            const roles: string[] = payload.roles || [];

            if (roles.includes("ADMIN")) {
                this.router.navigate(['/admin/events']);
            } else {
                this.router.navigate(['/events']);
            }
     
        } catch(err) {
            console.error(err);
            this.errorMessage.set("Invalid email or password.");
        } finally {
            this.isSubmitting.set(false);
        }
    }

    

}