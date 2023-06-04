import { Component, OnInit } from '@angular/core';
import {Article} from "../../../models/article/Article";
import {ArticleServiceService} from "../../../service/article-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  article: Article = {};
  articles: Article[] = [];

  p : number =1;

  totalPages: number[] = [];
  totalPage: number = 0;
  page: number = 0;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleServiceService) {
    this.getListArticle(0);

  }

  ngOnInit(): void {
    // this.getListArticle(0);
  }

  // getListArticle(pageable) {
  //   this.articleService.getAll(pageable).subscribe((data:any) => {
  //     this.articles = data.content;
  //     console.log(data);
  //     this.totalPagination = data.totalPages;
  //     this.indexPagination=1;
  //   }, error => console.log(error))
  // }
  featureArticles: any;

  getListArticle(pageable){
    this.articleService.getAll(pageable).subscribe((data:any) => {
      this.articles = data.content;
      console.log(data);
      this.totalPage = data.totalPages;
      this.totalPages=[]
      console.log(this.totalPage)
      for (let j=0; j<this.totalPage;j++){
        this.totalPages.push(j)
      }
      console.log(this.totalPages)
    }, error => console.log(error))
  }


  nextPage() {
    this.page++
    this.articleService.getAll(this.page).subscribe(next => {
      this.articles = next.content;
      console.log(this.page)
    })
  }

  prviousPage() {
    this.page--
    this.articleService.getAll(this.page).subscribe(next => {
      this.articles = next.content;
      console.log(this.page)
    })
  }

  accessPage(page: number) {
    this.page = page
    this.articleService.getAll(page).subscribe(next => {
      this.articles = next.content;
    })
  }
}
