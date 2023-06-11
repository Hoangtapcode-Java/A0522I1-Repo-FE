import {Component, HostListener, OnInit} from '@angular/core';
import {catchError, map, startWith, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CustomerServiceService} from "../../../../service/customer-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiResponse} from "../../../../dto/customerDTO/api-response";
import {Page} from "../../../../dto/customerDTO/page";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isSearchFormActive: boolean = false;
  isValueReceivedInvalid: boolean = false;
  hasSearchResults: boolean = false;

  // Customer
  customersStates$: Observable<{
    appState: string;
    appData?: ApiResponse<Page>;
    error?: HttpErrorResponse;
  }>;

  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  searchForm: FormGroup;

  // Customer Restore
  customerRestoresStates$: Observable<{
    appState: string;
    appData?: ApiResponse<Page>;
    error?: HttpErrorResponse;
  }>;

  responseRestoreSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageRestoreSubject = new BehaviorSubject<number>(0);
  currentRestorePage$ = this.currentPageRestoreSubject.asObservable();

  constructor(private customerService: CustomerServiceService) {
    this.searchForm = new FormGroup({
      valueReceived: new FormControl("", [
        Validators.pattern("^[a-zA-ZÀ-ÿ0-9\\s]+$"),
      ]),
      searchDateOfBirth: new FormControl(null),
      searchGender: new FormControl(null),
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

  closeToast() {
    this.isValueReceivedInvalid = false;
  }

  ngOnInit(): void {
    this.customersStates$ = this.customerService.getAllCustomers().pipe(
      tap((response: ApiResponse<Page>) => {
        console.log(response);
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.data.page.number);
        this.hasSearchResults = response.data.page.totalElements > 0;
      }),
      map((response: ApiResponse<Page>) => ({
        appState: "APP_LOADED",
        appData: response,
      })),
      startWith({ appState: "APP_LOADING" }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: "APP_ERROR", error })
      )
    );
  }

  openRestoreModal(): void {
    // Customer Restore
    this.customerRestoresStates$ = this.customerService
      .getAllCustomerRestores()
      .pipe(
        map((response: ApiResponse<Page>) => {
          console.log(response);
          this.responseRestoreSubject.next(response);
          this.currentPageRestoreSubject.next(response.data.page.number);
          return { appState: "APP_LOADED", appData: response };
        }),
        startWith({ appState: "APP_LOADING" }),
        catchError((error: HttpErrorResponse) =>
          of({ appState: "APP_ERROR", error })
        )
      );
  }

  getVisiblePageNumbers(totalPages: number, currentPage: number): number[] {
    const pageRange = 2; // Số lượng trang hiển thị xung quanh trang hiện tại
    const visiblePages: number[] = [];

    let endPage = Math.min(currentPage + pageRange, totalPages);
    let startPage = Math.max(endPage - pageRange * 2 + 1, 1);

    if (currentPage - pageRange < 1) {
      endPage = Math.min(startPage + pageRange * 2, totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  }

  shouldShowFirstPage(totalPages: number, currentPage: number): boolean {
    const pageRange = 2; // Số lượng trang hiển thị xung quanh trang hiện tại

    return totalPages > 5 && currentPage - pageRange > 1;
  }

  shouldShowLastPage(totalPages: number, currentPage: number): boolean {
    const pageRange = 2; // Số lượng trang hiển thị xung quanh trang hiện tại

    return totalPages > 5 && currentPage + pageRange < totalPages;
  }

  goToPage(pageNumber: number = 0): void {
    if (this.searchForm.get("valueReceived").invalid) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Bạn không thể tìm kiếm ký tự đặc biệt.",
      });
    } else {
      const valueReceived = this.searchForm.value.valueReceived || "";
      const searchDateOfBirth = this.searchForm.value.searchDateOfBirth;
      const searchGender = this.searchForm.value.searchGender;
      let dateOfBirth: Date | undefined;
      if (searchDateOfBirth) {
        dateOfBirth = new Date(searchDateOfBirth);
      }
      this.customersStates$ = this.customerService
        .getAllCustomers(valueReceived, dateOfBirth, searchGender, pageNumber)
        .pipe(
          tap((response: ApiResponse<Page>) => {
            console.log(response);
            if (response && response.data) {
              this.responseSubject.next(response);
              this.currentPageSubject.next(pageNumber);
              // Để đóng thanh phân trang khi search trường lỗi
              this.hasSearchResults = response.data.page.totalElements >= 0;
            } else {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "error",
                title: "Dữ liệu tìm kiếm không tồn tại.",
              });
              this.hasSearchResults = false;
            }
            // this.searchForm.reset();
            if (this.isSearchFormActive) {
              this.isSearchFormActive = false;
            }
          }),
          map((response: ApiResponse<Page>) => ({
            appState: "APP_LOADED",
            appData: response,
          })),
          startWith({
            appState: "APP_LOADING",
            appData: this.responseSubject.value || null,
          }),
          catchError((error: HttpErrorResponse) =>
            of({ appState: "APP_ERROR", error })
          )
        );
    }
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.goToPage(
      direction === "forward"
        ? this.currentPageSubject.value + 1
        : this.currentPageSubject.value - 1
    );
  }

  deleteCustomerById(id: number) {
    const swalWithCustomButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn swal2-confirm btn-customer-switch",
        cancelButton: "btn swal2-cancel btn-customer-switch",
      },
      buttonsStyling: false,
    });
    swalWithCustomButtons
      .fire({
        title: "Bạn có chắc chắn muốn xóa không?",
        text: "Bạn sẽ không thể khôi phục lại được.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
      })
      .then((result) => {
        if (result.value) {
          this.customerService.deleteById(id).subscribe(
            () => {
              console.log(this.currentPageSubject.value);
              this.goToPage(this.currentPageSubject.value);
            },
            (error) => {
              console.log(error);
              Swal.fire(
                "Cảnh báo!",
                "Trường này đã được xóa từ trước.",
                "error"
              );
              this.goToPage(this.currentPageSubject.value);
            }
          );
          Swal.fire("Đã Xóa!", "Trường này đã bị loại bỏ.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Đã hủy!", "Trường này vẫn an toàn.", "error");
        }
      });
  }

  restoreCustomerById(id: number) {
    this.customerService.restoreById(id).subscribe(() => {
      console.log(this.currentPageRestoreSubject.value);
      this.goToPageRestore("", this.currentPageRestoreSubject.value);
      this.goToPage(this.currentPageSubject.value);
    });

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Bạn đã khôi phục thành công.",
    });
  }

  goToPageRestore(valueReceived?: string, pageNumber: number = 0): void {
    this.customerRestoresStates$ = this.customerService
      .getAllCustomerRestores(valueReceived, pageNumber)
      .pipe(
        map((response: ApiResponse<Page>) => {
          console.log(response);
          this.responseRestoreSubject.next(response);
          this.currentPageRestoreSubject.next(pageNumber);
          return { appState: "APP_LOADED", appData: response };
        }),
        startWith({
          appState: "APP_LOADED",
          appData: this.responseRestoreSubject.value || undefined,
        }),
        catchError((error: HttpErrorResponse) =>
          of({ appState: "APP_ERROR", error })
        )
      );
  }

  goToNextOrPreviousPageRestore(
    direction?: string,
    valueReceived?: string
  ): void {
    this.goToPageRestore(
      valueReceived,
      direction === "forward"
        ? this.currentPageRestoreSubject.value + 1
        : this.currentPageRestoreSubject.value - 1
    );
  }

}
