import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateComponent} from "./create/create.component";
import {AuthGuardService} from "../../../service/auth-guard.service";
import {ListComponent} from "./list/list.component";


const routes: Routes = [
  {
    path: 'create', component: CreateComponent, canActivate: [AuthGuardService]
  },{
    path: '', component: ListComponent, canActivate: [AuthGuardService]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
