import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {ArticlePageModule} from "../article-page/article-page.module";


@NgModule({
  declarations: [HomePageComponent],
    imports: [
        CommonModule,
        HomePageRoutingModule,
        ArticlePageModule
    ]
})
export class HomePageModule { }
