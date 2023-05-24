import { Component, OnInit } from '@angular/core';
import {Article} from "../../../models/article/Article";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleServiceService} from "../../../service/article-service.service";

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],

})
export class FeatureListComponent implements OnInit {
  article: Article = {};
  featureArticles: Article[] = [];
  nameF: string = '';
  totalPagination: number;
  indexPagination: number = 1;
  p : number =1;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleServiceService) { }

  ngOnInit(): void {
    this.getListFeature();
  }

  getListFeature() {
    this.articleService.getFeature().toPromise().then(r=>{
      this.featureArticles = r;
      console.log(r);
    })
  }


}
