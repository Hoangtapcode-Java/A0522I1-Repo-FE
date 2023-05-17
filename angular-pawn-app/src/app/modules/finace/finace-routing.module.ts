import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GetFinaceComponent} from "./get-finace/get-finace.component";


const routes: Routes = [{
  path:"finace",component:GetFinaceComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinaceRoutingModule { }
