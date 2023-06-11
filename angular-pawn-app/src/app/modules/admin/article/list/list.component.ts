import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl,  FormGroup} from "@angular/forms";
import {Article} from "../../../../models/article/Article";
import {ArticleServiceService} from "../../../../service/article-service.service";
declare const Swal: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isSearchFormActive: boolean = false;
  searchForm: FormGroup;
  article: Article = {};
  articles: Article[] = [];


  p: number = 1;

  totalPages: number[] = [];
  totalPage: number = 0;
  page: number = 0;
  currentPage: number = 0;
  startIndex: number;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleServiceService) {
    this.searchForm = new FormGroup({
      searchName: new FormControl(''),
      searchDate: new FormControl(null),
    });
    this.getListArticle(0);
    this.startIndex = 0;
  }

  toggleFormSearch(event: MouseEvent): void {
    event.stopPropagation();
    this.isSearchFormActive = !this.isSearchFormActive;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    const formSearchElement = document.querySelector(".form-search");
    const searchBoxElement = document.querySelector(".searchBox");
    const isOutsideFormSearch =
      formSearchElement &&
      !formSearchElement.contains(event.target as HTMLElement);
    const isInsideSearchBox =
      searchBoxElement &&
      searchBoxElement.contains(event.target as HTMLElement);
    if (this.isSearchFormActive && isOutsideFormSearch && !isInsideSearchBox) {
      this.isSearchFormActive = false;
    }
  }

  ngOnInit(): void {

  }

  getListArticle(pageable: number = 0) {
    console.log(pageable)
    this.articleService.getAll(pageable).subscribe(data => {
      console.log(data);
      this.articles = data.content;
      this.totalPage = data.totalPages;
      this.currentPage = data.number;
      console.log(this.currentPage);
    }, error => console.log(error))
  }


  gotoNextOrPreviousPage(direction: string): void {
    this.getSearch(direction === 'forward' ? this.currentPage + 1 : this.currentPage - 1);
  }

  deleteArticle(deleteArticle: Article) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn swal2-confirm",
        cancelButton: "btn swal2-cancel"
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Xác nhận xóa bài báo',
      text: 'Bài báo: ' + deleteArticle.title + ' sẽ không được phục hồi sau khi xóa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy bỏ',
      reverseButtons: false,
      customClass: {
        content: 'custom-swal-content'
      }
    }).then((result) => {
      if (result.value) {
        this.articleService.deleteArticle(deleteArticle.id).subscribe(() => {
          this.getListArticle(0);
          // this.route.navigateByUrl("/article");
        });
        swalWithBootstrapButtons.fire(
          'Đã xóa!',
          'Đã xóa thành công bài báo',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Đã hủy!',
          'Đã hủy xóa bài báo',
          'error'
        )
      }
    })
  }


  getSearch(pageNumber: number) {
    this.articleService.searchArticleByName(this.searchForm.value.searchName, pageNumber).subscribe(data => {
      if (data === null) {
        Swal.fire(
          'Không tìm thấy bài báo',
          'Vui lòng thử lại!!!'
        )
        this.getListArticle(0);
      } else {
        this.articles = data.content;
        this.totalPage = data.totalPages;
        this.currentPage = pageNumber;
        this.startIndex = 5 * data.number;
        this.page = data.number;
      }
    })
  }
}
