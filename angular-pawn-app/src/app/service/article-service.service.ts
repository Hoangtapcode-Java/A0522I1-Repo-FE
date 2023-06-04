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
    return this.httpClient.post("http://localhost:8080/api/articles/save", article, {
      headers: {
        Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDb25ndGFuMjEiLCJpYXQiOjE2ODU5MDk4MDQsImV4cCI6MTY4NTk5NjIwNH0.Obk9nU_dhjDuT6cvM_jn1EZbJAJT00nBdf3QkxyyD2eqwJzWT99rFNjn2SwuPg-2N3dHGLEoiK6CnoubVsGyuQ",
      }
    });
  }
}
