import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlePageRoutingModule } from './article-page-routing.module';
import { ArticlePageComponent } from './article-page.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { HeaderForArticleComponent } from './header-for-article/header-for-article.component';
import { FooterForArticleComponent } from './footer-for-article/footer-for-article.component';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureListSidebarComponent } from './feature-list-sidebar/feature-list-sidebar.component';
import { TruncatePipe } from './list/truncate.pipe';
import { DateFormatPipe } from './date-format.pipe';


@NgModule({
    declarations: [
        ArticlePageComponent,
        ListComponent,
        ViewComponent,
        HeaderForArticleComponent,
        FooterForArticleComponent,
        FeatureListComponent,
        FeatureListSidebarComponent,
        TruncatePipe,
        DateFormatPipe],
    exports: [
        HeaderForArticleComponent,
        FooterForArticleComponent,
        FeatureListComponent,
        DateFormatPipe
    ],
    imports: [
        CommonModule,
        ArticlePageRoutingModule
    ]
})
export class ArticlePageModule { }
