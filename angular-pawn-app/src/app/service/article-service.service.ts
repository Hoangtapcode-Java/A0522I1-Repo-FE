import { Injectable } from '@angular/core';
import {Article} from "../models/article/Article";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ArticleDTO} from "../models/article/ArticleDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {
  articles: Article[] = [];
  page: number = 1;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  private header: any;

  constructor(private httpClient: HttpClient) {
    this.header = new Headers({'Content-Type': 'application/context'})
  }

  getAll(page:Number): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/article-list?page="+page) ;
  }

  getFeature(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/feature") ;
  }


  viewArticle(value: number): Observable<Article> {
    return this.httpClient.get<Article>('http://localhost:8080/api/article-view/' + value);
  }

  deleteArticle(value: Number):Observable<any> {
    return this.httpClient.patch<any>('http://localhost:8080/api/delete-article/' + value,this.httpOptions);
  }

  searchArticleByName(name: any, pageNumber: number = 5): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/search-article?name=' + name + '&page=' + pageNumber);
  }

  saveArticle(article: ArticleDTO): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/article/save', article, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBQkMxMjMiLCJpYXQiOjE2ODU3MDkyOTUsImV4cCI6MTY4NTc5NTY5NX0.i9MDqwBKGrieDyn9NVrWnLeCpFg7gNDHDIpG7G_bBsTPt3UTktYgsv50ZI8fkOz_JvkurAktP8avYsDSOB_ktw",
      }
    });
  }
}
