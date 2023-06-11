import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import {UpdateComponent} from './update/update.component';
import {DeleteComponent} from './delete/delete.component';
import {LoginComponent} from './login/login.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {ErrorComponent} from './error/error.component';
import {AuthGuardService} from "../../../service/auth-guard.service";
import {UserRole} from "../../../models/UserRole";


const routes: Routes = [
  {
    path: '', component: ListComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'create', component: CreateComponent, canActivate: [AuthGuardService], data: {roles: [UserRole.Admin]}
  },
  {
    path: 'update', component: UpdateComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'delete', component: DeleteComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'forgot', component: ForgotpasswordComponent
  }
  , {
    path: 'error', component: ErrorComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
