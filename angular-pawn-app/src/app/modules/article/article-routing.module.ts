import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";
import {DeleteComponent} from "./delete/delete.component";
import {ArticleComponent} from "./article.component";
import {AuthGuardService} from "../../service/auth-guard.service";


const routes: Routes = [{
  path: 'article', component: ArticleComponent, children: [
    {
      path: '', component: ListComponent
    },
    {
      path: 'create', component: CreateComponent,canActivate: [AuthGuardService]
    },
    {
      path: 'update', component: UpdateComponent
    },
    {
      path: 'delete', component: DeleteComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
