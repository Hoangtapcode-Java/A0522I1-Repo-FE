import {Component, HostListener, OnInit} from '@angular/core';
import {Article} from "../../../models/article/Article";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleServiceService} from "../../../service/article-service.service";
import {FormControl, FormControlName, FormGroup} from "@angular/forms";

declare const Swal: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isSearchFormActive: boolean=false;
  searchForm: FormGroup;
  article: Article = {};
  articles: Article[] = [];
  titleSearch: string = '';
  modalOpen = false;

  p : number =1;

  totalPages: number[] = [];
  totalPage: number = 0;
  page: number = 0;
  currentPage: number = 0;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleServiceService) {
    this.searchForm = new FormGroup({
        searchName: new FormControl(''),
        searchDate: new FormControl(null),
    });
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
    this.getListArticle(0);
  }

  // getListArticle(pageable) {
  //   this.articleService.getAll(pageable).subscribe((data:any) => {
  //     this.articles = data.content;
  //     console.log(data);
  //     this.totalPagination = data.totalPages;
  //     this.indexPagination=1;
  //   }, error => console.log(error))
  // }

  getListArticle(pageable) {
    this.articleService.getAll(pageable).subscribe((data:any) => {
      console.log(data);
      this.articles = data.content;
      this.totalPage = data.totalPages;
      this.currentPage = data.number;
      // this.totalPages=[]
      // console.log(this.totalPage)
      // for (let j=0; j<this.totalPage;j++){
      //   this.totalPages.push(j)
      // }
      // console.log(this.totalPages)
    }, error => console.log(error))
  }

  // nextPage() {
  //   this.page++
  //   this.articleService.getAll(this.page).subscribe(next => {
  //     this.articles = next.content;
  //     console.log(this.page)
  //   })
  // }
  //
  // prviousPage() {
  //   this.page--
  //   this.articleService.getAll(this.page).subscribe(next => {
  //     this.articles = next.content;
  //     console.log(this.page)
  //   })
  // }
  //
  // accessPage(page: number) {
  //   this.page = page
  //   this.articleService.getAll(page).subscribe(next => {
  //     this.articles = next.content;
  //   })
  // }

  gotoNextOrPreviousPage(direction: string): void {
    this.getSearch(direction === 'forward'? this.currentPage + 1 : this.currentPage - 1);
  }

  deleteArticle(deleteArticle: Article) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn swal2-confirm btn-customer-switch",
        cancelButton: "btn swal2-cancel btn-customer-switch"
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.
    fire({
      title: 'Xác nhận xóa bài báo',
      text: 'Bài báo: ' + deleteArticle.title +' sẽ không được phục hồi sau khi xóa',
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
        this.articleService.deleteArticle(deleteArticle.id).subscribe(()=>{
          this.route.navigateByUrl('/article');
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


  getSearch(pageNumber: number = 0) {
    console.log(this.searchForm.value.searchName);
      this.articleService.searchArticleByName(this.searchForm.value.searchName, pageNumber).subscribe(data => {
        if (data === null) {
          Swal.fire(
            'Không tìm thấy bài báo',
            'error'
          )
          this.getListArticle(0);
        }else{
          this.articles = data.content;
          this.totalPage = data.totalPages;
          this.currentPage = pageNumber;
          // console.log(data);
        }
      })
  }
}
