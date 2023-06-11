import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {AuthClientService} from "../../service/auth-client.service";
import {Router} from "@angular/router";
import {EmployeeServiceService} from "../../service/employee-service.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isSidebarHidden: boolean = true;
  isDropdownBellOpen: boolean = false;
  screenWidth: number;
  img:string;
  name:string

  toggleActive(event: Event) {
    const target = event.target as HTMLElement;
    const sideMenuItems = document.querySelectorAll("#sidebar .side-menu li");

    sideMenuItems.forEach((item) => {
      item.classList.remove("active");
      const beforeElement = item.querySelector("a::before");
      beforeElement?.classList.remove("active");

      const dropdown = item.querySelector(".side-dropdown");
      if (dropdown) {
        dropdown.classList.remove("show");
      }
    });

    const parentLi = target.closest("li");
    parentLi?.classList.add("active");
    const beforeElement = parentLi?.querySelector("a::before");
    beforeElement?.classList.add("active");

    const dropdown = parentLi?.querySelector(".side-dropdown");
    if (dropdown) {
      dropdown.classList.add("show");
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/user/login');
  }
  toggleDropdown(event: Event) {
    const target = event.target as HTMLElement;
    const parentLi = target.closest("li");
    const dropdown = parentLi?.querySelector(".side-dropdown");

    const activeItems = document.querySelectorAll(
      "#sidebar .side-menu li.active"
    );
    activeItems.forEach((item) => {
      if (item !== parentLi) {
        item.classList.remove("active");
        const beforeElement = item.querySelector("a::before");
        beforeElement?.classList.remove("active");

        const itemDropdown = item.querySelector(".side-dropdown");
        if (itemDropdown) {
          itemDropdown.classList.remove("show");
        }
      }
    });

    if (dropdown) {
      dropdown.classList.toggle("show");

      // Thêm class 'active' cho li và biểu tượng xoay
      parentLi?.classList.toggle("active");
      const iconRight = parentLi?.querySelector(".icon-right");
      iconRight?.classList.toggle("rotate");
    }
  }

  toggleDropdownInBell(event: MouseEvent) {
    event.stopPropagation();
    this.isDropdownBellOpen = !this.isDropdownBellOpen;
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
// Đóng siderbar khi màn hình dưới 850
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenWidth = event.target.innerWidth;
    this.checkScreenWidth();
  }
  checkScreenWidth() {
    if (this.screenWidth <= 850) {
      this.isSidebarHidden = false;
    } else {
      this.isSidebarHidden = true;
    }
  }
  // Đóng siderbar khi màn hình dưới 850
  constructor(private renderer: Renderer2,private authService: AuthClientService,private router: Router,private employeeService:EmployeeServiceService) {
    this.employeeService.findByIdEmployee().subscribe(next=>{
      this.img=next.avatar;
      this.name=next.name;
    })
  }

  ngOnInit(): void {
    // Đóng siderbar khi màn hình dưới 850
    this.screenWidth = window.innerWidth;
    this.checkScreenWidth();
    // Đóng siderbar khi màn hình dưới 850

    // profile dropdown
    const profile = document.querySelector("nav .profile") as HTMLElement;
    const imgProfile = profile.querySelector("img") as HTMLElement;
    const dropdownProfile = profile.querySelector(
      ".profile-link"
    ) as HTMLElement;

    imgProfile.addEventListener("click", function () {
      dropdownProfile.classList.toggle("show");
    });
    window.addEventListener("click", function (e) {
      if (e.target !== imgProfile) {
        if (e.target !== dropdownProfile) {
          if (dropdownProfile.classList.contains("show")) {
            dropdownProfile.classList.remove("show");
          }
        }
      }
    });

    this.renderer.listen("document", "click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const dropdownElement = document.querySelector(".dropdown-menu");
      const dropdownLinkElement = document.getElementById("dropdown-link");

      if (dropdownElement && dropdownLinkElement) {
        if (
          dropdownLinkElement.contains(target) ||
          dropdownElement.contains(target)
        ) {
          // Click vào dropdown-link hoặc dropdown-menu, không đóng dropdown-menu
          return;
        }

        // Đóng dropdown-menu nếu click bên ngoài
        this.isDropdownBellOpen = false;
      }
    });
  }

}
