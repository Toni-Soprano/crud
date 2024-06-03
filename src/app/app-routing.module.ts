import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccessCardListComponent} from './acces-card-list/acces-card-list.component'
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ManageAccessComponent } from './manage-access/manage-access.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'main', component: MainContentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manage', component: ManageAccessComponent },
  { path: 'access', component: AccessCardListComponent },
  { path: 'users', component: ManageUsersComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
