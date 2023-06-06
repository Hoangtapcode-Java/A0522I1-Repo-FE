import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from "./employee.component";
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";
import {DeleteComponent} from "./delete/delete.component";
import {EditEmployeeInforComponent} from "./edit-employee-infor/edit-employee-infor.component";


const routes: Routes = [{path:'employee',component:EmployeeComponent,children:[
    {
      path: '', component: ListComponent
    },
    {
      path: 'create', component: CreateComponent
    },
    {
      path: 'update', component: UpdateComponent
    },
    {
      path:'delete',component:DeleteComponent
    },
    {
      path:'edit-employee-infor',component:EditEmployeeInforComponent
    }
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
