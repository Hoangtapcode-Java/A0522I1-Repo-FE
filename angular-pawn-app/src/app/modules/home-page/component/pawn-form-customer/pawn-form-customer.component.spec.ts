import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PawnFormCustomerComponent } from './pawn-form-customer.component';

describe('PawnFormCustomerComponent', () => {
  let component: PawnFormCustomerComponent;
  let fixture: ComponentFixture<PawnFormCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PawnFormCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PawnFormCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
