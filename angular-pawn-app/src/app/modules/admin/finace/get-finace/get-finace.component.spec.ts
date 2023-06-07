import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFinaceComponent } from './get-finace.component';

describe('GetFinaceComponent', () => {
  let component: GetFinaceComponent;
  let fixture: ComponentFixture<GetFinaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFinaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFinaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
