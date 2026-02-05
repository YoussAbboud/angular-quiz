import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { UserDetails } from './pages/user-details/user-details';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', component: Users },
  { path: 'users/:id', component: UserDetails },
  { path: '**', redirectTo: 'users' }
];