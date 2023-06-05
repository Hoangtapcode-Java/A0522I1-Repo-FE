import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from "./employee.component";
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";
import {DeleteComponent} from "./delete/delete.component";
import {EditEmployeeInforComponent} from "./edit-employee-infor/edit-employee-infor.component";
import {AuthGuardService} from "../../service/auth-guard.service";


const routes: Routes = [{path:'employee',component:EmployeeComponent,children:[
    {
      path: '', component: ListComponent,canActivate: [AuthGuardService]
    },
    {
      path: 'create', component: CreateComponent,canActivate: [AuthGuardService]
    },
    {
      path: 'update', component: UpdateComponent,canActivate: [AuthGuardService]
    },
    {
      path:'delete',component:DeleteComponent,canActivate: [AuthGuardService]
    },
    {
      path:'edit-employee-infor',component:EditEmployeeInforComponent,canActivate: [AuthGuardService]
    }
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
