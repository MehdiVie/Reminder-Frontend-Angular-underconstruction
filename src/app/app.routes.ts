import { Routes } from '@angular/router';
import { EventListComponent } from './features/event-list/event-list';
import { AdminEventListComponent } from './features/admin-event-list/admin-event-list';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard';
import { LoginComponent } from './features/auth/login/login';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventListComponent },
  { path: 'login', component: LoginComponent } ,
  { path: 'admin/events' , component: AdminEventListComponent , canActivate: [AdminGuard]} ,
  { path: 'admin/stats' , component: AdminDashboardComponent , canActivate: [AdminGuard]} ,
  { path: '**', redirectTo : 'login' } 
];
