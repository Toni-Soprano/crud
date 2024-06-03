import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccessCardListComponent } from './acces-card-list/acces-card-list.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ManageAccessComponent } from './manage-access/manage-access.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'access', component: AccessCardListComponent, canActivate: [AuthGuard] },
  { path: 'manage', component: ManageAccessComponent  },
  { path: 'users', component: ManageUsersComponent , canActivate: [AuthGuard]},
  { path: 'main', component: MainContentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
