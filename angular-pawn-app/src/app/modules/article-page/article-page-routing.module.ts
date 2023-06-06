import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleComponent} from "../article/article.component";
import {ListComponent} from "./list/list.component";
import {ViewComponent} from "./view/view.component";


const routes: Routes = [{
    path:"article-page",
    component:ArticleComponent, children: [
  {
    path:"",
    component: ListComponent
  },
  {
    path:"view/:id",
    component: ViewComponent
  }
  ]

}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlePageRoutingModule { }
