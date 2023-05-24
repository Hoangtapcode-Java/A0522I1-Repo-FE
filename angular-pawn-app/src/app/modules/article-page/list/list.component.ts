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

  nameF: string = '';
  totalPagination: number;
  indexPagination: number = 1;
  p : number =1;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleServiceService) { }

  ngOnInit(): void {
    this.getListArticle(0);
  }

  getListArticle(pageable) {
    this.articleService.getAll(pageable).subscribe((data:any) => {
      this.articles = data.content;
      console.log(data);
      this.totalPagination = data.totalPages;
      this.indexPagination=1;
    }, error => console.log(error))
  }


  firtPage() {
    this.indexPagination = 1;
    this.articleService.getAll((this.indexPagination) - 1).subscribe((next:any) => {
      this.articles = next.content;
    })
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.articleService.getAll((this.indexPagination) - 1).subscribe((next:any) => {
      this.articles = next.content;
    })
  }

  prviousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.ngOnInit();
    } else {
      this.articleService.getAll(this.indexPagination - 1).subscribe((next:any) => {
        this.articles = next.content;
      })
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination;
    this.articleService.getAll(this.indexPagination - 1).subscribe((next:any) => {
      this.articles = next.content;
    })
  }

  findPaginnation(target: any) {
    if (parseInt(target.value) > this.totalPagination) {
      target.value = this.indexPagination;
    } else {
      this.articleService.getAll(target.value - 1).subscribe((next: any) => {
        this.articles = next.content;
      })
      this.indexPagination = parseInt(target.value);
    }
  }

}
