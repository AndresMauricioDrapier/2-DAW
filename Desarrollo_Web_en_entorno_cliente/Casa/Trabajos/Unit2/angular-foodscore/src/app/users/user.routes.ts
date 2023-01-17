import { Routes } from '@angular/router';
import { leavePageGuard } from '../guards/leave-page-guard.guard';
import { userResolver } from './resolvers/user-resolver.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users.component').then((m) => m.UsersComponent),
    canDeactivate: [leavePageGuard],
  },
  {
    path: 'me',
    loadComponent: () =>
      import('./user-details/user-details.component').then(
        (m) => m.UserDetailsComponent
      ),
    canDeactivate: [leavePageGuard],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./user-details/user-details.component').then(
        (m) => m.UserDetailsComponent
      ),
    canDeactivate: [leavePageGuard],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
    canDeactivate: [leavePageGuard],
    resolve: { user: userResolver },
  },
];
