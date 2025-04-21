import { Routes } from '@angular/router';

import { RegisterUserPage } from './layout/main/pages/register-user-page/register-user-page.component';
import { DisplayUsersPage } from './layout/main/pages/display-users-page/display-users-page.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { UserDetailsPage } from './layout/main/pages/user-details-page/user-details-page.component';
import { ROUTES } from './utils/constants';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: ROUTES.REGISTER.substring(1), component: RegisterUserPage },
  { path: ROUTES.USERS.substring(1), component: DisplayUsersPage },
  { path: `${ROUTES.USERS.substring(1)}/:id`, component: UserDetailsPage },
  { path: '**', component: NotFoundComponent },
];
