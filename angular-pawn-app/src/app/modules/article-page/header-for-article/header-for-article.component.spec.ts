import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderForArticleComponent } from './header-for-article.component';

describe('HeaderForArticleComponent', () => {
  let component: HeaderForArticleComponent;
  let fixture: ComponentFixture<HeaderForArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderForArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderForArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
