import { Routes } from '@angular/router';
import { EventListComponent } from './features/event-list/event-list';
import { LoginComponent } from './features/auth/login/login';

export const routes: Routes = [
  { path: 'events', component: EventListComponent },
  { path: 'login', component: LoginComponent } ,
  { path: '**', redirectTo : 'login' } 
];
