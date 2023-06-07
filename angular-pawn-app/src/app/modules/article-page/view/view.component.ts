import { Component, OnInit } from '@angular/core';
import {Article} from "../../../models/article/Article";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleServiceService} from "../../../service/article-service.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  article: Article = {};
  id: number;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleServiceService) {
  }

  ngOnInit(): void {
    this.viewArticle();
  }

  viewArticle(){
    this.activatedRoute.paramMap.subscribe(next=>{
      const id = next.get('id');
      if (id != null){
        this.articleService.viewArticle(parseInt(id)).subscribe((data:any)=>{
          this.article = data;
          console.log(this.article);
        }, error => console.log(error))
      }
    })
  }
}
