import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContractComponent} from "./contract.component";
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";
import {DeleteComponent} from "./delete/delete.component";
import { AuthGuardService } from 'src/app/service/auth-guard.service';
import { UserRole } from 'src/app/models/UserRole';


const routes: Routes = [{path:'contract',component:ContractComponent,children:[
    {
      path: '', component: ListComponent, canActivate: [AuthGuardService]
    },
    {
      path: 'create', component: CreateComponent, canActivate: [AuthGuardService], data: {roles: [UserRole.Admin, UserRole.User]}
    },
    {
      path: 'update', component: UpdateComponent, canActivate: [AuthGuardService]
    },
    {
      path:'delete',component: DeleteComponent, canActivate: [AuthGuardService]
    }
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
