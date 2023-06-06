import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditEmployeeInforComponent} from "./edit-employee-infor/edit-employee-infor.component";
import {AuthGuardService} from "../../../service/auth-guard.service";


const routes: Routes = [
        {
      path:'edit-employee-infor',component:EditEmployeeInforComponent,canActivate: [AuthGuardService]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
