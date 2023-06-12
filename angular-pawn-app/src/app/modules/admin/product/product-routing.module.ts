import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";
import {DeleteComponent} from "./delete/delete.component";
import {DetailComponent} from "./detail/detail.component";


const routes: Routes = [
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
    path: 'delete', component: DeleteComponent
  },
  {
    path: 'detail/:id', component: DetailComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
