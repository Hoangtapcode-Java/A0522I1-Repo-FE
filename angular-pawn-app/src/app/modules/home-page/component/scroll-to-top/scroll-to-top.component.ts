import {Component, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {

  constructor(private router: Router) {}

  backToTop(): void {
    // const select = (el: string, all = false): Element | Element[] => {
    //   el = el.trim();
    //   if (all) {
    //     return Array.from(document.querySelectorAll(el));
    //   } else {
    //     return document.querySelector(el);
    //   }
    // };
    // const on = (type: string, el: string, listener: EventListenerOrEventListenerObject, all = false): void => {
    //   const selectEl = select(el, all);
    //   if (selectEl) {
    //     if (all) {
    //       // @ts-ignore
    //       selectEl.forEach((e: Element) => e.addEventListener(type, listener));
    //     } else {
    //       // @ts-ignore
    //       selectEl.addEventListener(type, listener);
    //     }
    //   }
    // };
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
     * Back to top button
     */
    const backtotop1 = select('.back-to-top');
    if (backtotop1) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop1.classList.add('active');
        } else {
          backtotop1.classList.remove('active');
        }
      };
      window.addEventListener('load', toggleBacktotop);
      onscroll(document, toggleBacktotop);
    }
  }

  ngOnInit(): void {
    window.onscroll = () => this.scrollFunction();
    this.backToTop();
  }

   scrollFunction(): void {
     const backToTopElement: HTMLElement | null = document.getElementById('back-to-top');
     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
       backToTopElement.style.display = 'block';
    } else {
      backToTopElement.style.display = 'none';
    }
  }

  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
