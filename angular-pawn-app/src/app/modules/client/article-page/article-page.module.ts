import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlePageRoutingModule } from './article-page-routing.module';
import { ArticlePageComponent } from './article-page.component';


@NgModule({
  declarations: [ArticlePageComponent],
  imports: [
    CommonModule,
    ArticlePageRoutingModule
  ]
})
export class ArticlePageModule { }
