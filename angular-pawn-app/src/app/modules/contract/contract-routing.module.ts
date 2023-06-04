import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContractComponent} from './contract.component';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import {UpdateComponent} from './update/update.component';
import {ReturnItemsComponent} from './return-items/return-items.component';
import {AuthGuardService} from '../../service/auth-guard.service';
import {UserRole} from '../../models/UserRole';
// @ts-ignore


const routes: Routes = [{
  path: 'contract', component: ContractComponent, children: [
    {
      path: '', component: ListComponent, canActivate: [AuthGuardService], data: {roles: [UserRole.User]}
    },
    {
      path: 'create', component: CreateComponent, canActivate: [AuthGuardService], data: {roles: [UserRole.User]}
    },
    {
      path: 'update', component: UpdateComponent, canActivate: [AuthGuardService], data: {roles: [UserRole.User]}
    },
    {
      path: 'return', component: ReturnItemsComponent, canActivate: [AuthGuardService], data: {roles: [UserRole.User]}
    },
    {
      path: 'update/:id', component: UpdateComponent, canActivate: [AuthGuardService], data: {roles: [UserRole.User]}
    }
  ]
}];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule {
}
