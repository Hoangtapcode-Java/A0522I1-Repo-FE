import { Component, OnInit } from '@angular/core';
import {Article} from '../../../models/article/Article';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleServiceService} from '../../../service/article-service.service';

@Component({
  selector: 'app-feature-list-sidebar',
  templateUrl: './feature-list-sidebar.component.html',
  styleUrls: ['./feature-list-sidebar.component.css']
})
export class FeatureListSidebarComponent implements OnInit {

  article: Article = {};
  featureArticles: Article[] = [];

  p = 1;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleServiceService) { }

  ngOnInit(): void {
    this.getListFeature();
  }


  getListFeature() {
    this.articleService.getFeature().toPromise().then(r => {
      this.featureArticles = r;
      console.log(r);
    });
  }

}
