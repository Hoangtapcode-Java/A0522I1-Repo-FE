import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from "./product.component";
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";
import {DeleteComponent} from "./delete/delete.component";
import { DetailComponent } from './detail/detail.component';
import {AuthGuardService} from "../../service/auth-guard.service";
import {UserRole} from "../../models/UserRole";


const routes: Routes = [{path:'product',component:ProductComponent,children:[
    {
      path: '', component: ListComponent, canActivate: [AuthGuardService]
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
      path:'detail/:id',component:DetailComponent
    }
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
