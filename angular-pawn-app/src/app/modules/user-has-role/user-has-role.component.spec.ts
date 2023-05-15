import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHasRoleComponent } from './user-has-role.component';

describe('UserHasRoleComponent', () => {
  let component: UserHasRoleComponent;
  let fixture: ComponentFixture<UserHasRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHasRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHasRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
