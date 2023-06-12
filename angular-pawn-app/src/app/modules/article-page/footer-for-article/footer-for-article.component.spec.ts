import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterForArticleComponent } from './footer-for-article.component';

describe('FooterForArticleComponent', () => {
  let component: FooterForArticleComponent;
  let fixture: ComponentFixture<FooterForArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterForArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterForArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
