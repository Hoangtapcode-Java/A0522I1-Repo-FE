import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractLiquidationComponent } from './contract-liquidation.component';

describe('ContractLiquidationComponent', () => {
  let component: ContractLiquidationComponent;
  let fixture: ComponentFixture<ContractLiquidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractLiquidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractLiquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
