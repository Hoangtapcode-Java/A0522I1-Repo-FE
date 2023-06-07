import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureListSidebarComponent } from './feature-list-sidebar.component';

describe('FeatureListSidebarComponent', () => {
  let component: FeatureListSidebarComponent;
  let fixture: ComponentFixture<FeatureListSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureListSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
