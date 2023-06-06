import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeInforComponent } from './edit-employee-infor.component';

describe('EditEmployeeInforComponent', () => {
  let component: EditEmployeeInforComponent;
  let fixture: ComponentFixture<EditEmployeeInforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmployeeInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
