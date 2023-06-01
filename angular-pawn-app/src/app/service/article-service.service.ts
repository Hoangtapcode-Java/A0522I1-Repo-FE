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
    return this.httpClient.post("http://localhost:8080/api/article/save", article, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDb25ndGFuMjEiLCJpYXQiOjE2ODU2NDI2MDAsImV4cCI6MTY4NTcyOTAwMH0.lhzGPiGitOHt2RotLFrSDci2lBSlVClOKUI8FaCyjYI8JJq3Svj_ZpnF0zj6wuijmWkrYnO08eTwuhm7jzzt-Q",
      }
    });
  }
}
