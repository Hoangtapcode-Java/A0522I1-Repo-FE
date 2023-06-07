import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleDTO} from "../models/article/ArticleDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  constructor(private httpClient: HttpClient) {
  }

  saveArticle(article: ArticleDTO): Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/articles/save", article);
  }
}
