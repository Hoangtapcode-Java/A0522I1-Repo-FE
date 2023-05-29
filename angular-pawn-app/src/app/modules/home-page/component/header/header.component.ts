import {Component, ElementRef, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(elementRef: ElementRef,
              private router: Router) {
  }

  ngOnInit(): void {
    this.menu();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
      }
    });
  }
  //   menu_btn(): void {
  //     const navbar = document.querySelector('.header .navbar');
  //     navbar.classList.add('active');
  //   }
  //
  // menu_close(): void {
  //   const navbar = document.querySelector('.header .navbar');
  //   navbar.classList.remove('active');
  // }
  // tslint:disable-next-line:only-arrow-functions
  menu() {
    'use strict';

    /**
     * Easy selector helper function
     */
    const select = (el: any, all = false) => {
      el = el.trim();
      if (all) {
        // @ts-ignore
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

    /**
     * Easy event listener function
     */
    const on = (type: any, el: any, listener: any, all = false) => {
      const selectEl = select(el, all);
      if (selectEl) {
        if (all) {
          // @ts-ignore
          selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
          selectEl.addEventListener(type, listener);
        }
      }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el: any, listener: any) => {
      el.addEventListener('scroll', listener);
    };

    /**
     * Navbar links active state on scroll
     */
    const navbarlinks = select('#navbar .scrollto', true);
    const navbarlinksActive = () => {
      const position = window.scrollY + 200;
      // @ts-ignore
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) { return; }
        const section = select(navbarlink.hash);
        if (!section) { return; }
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      });
    };
    window.addEventListener('load', navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el: any) => {
      const header = select('#header');
      const offset = header.offsetHeight;

      const elementPos = select(el).offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      });
    };
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e: any) {
      select('#navbar').classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e: any) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    }, true);

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e: any) {
      if (select(this.hash)) {
        e.preventDefault();

        const navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          const navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
        scrollto(this.hash);
      }
    }, true);

    // @ts-ignore
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash);
        }
      }
    });
  }
}
