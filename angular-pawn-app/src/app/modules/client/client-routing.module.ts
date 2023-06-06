import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from "../auth/auth.component";
import {HomePageComponent} from "./home-page/home-page.component";


const routes: Routes = [{
  path: "", component: AuthComponent, children: [{
    path: "", loadChildren: () => import("./article-page/article-page.module").then(m => m.ArticlePageModule)
  }]
},
  {
    path: "home", component: HomePageComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
