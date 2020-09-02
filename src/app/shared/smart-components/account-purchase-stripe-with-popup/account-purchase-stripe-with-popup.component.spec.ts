import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPurchaseStripeWithPopupComponent } from './account-purchase-stripe-with-popup.component';

describe('AccountPurchaseStripeWithPopupComponent', () => {
  let component: AccountPurchaseStripeWithPopupComponent;
  let fixture: ComponentFixture<AccountPurchaseStripeWithPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPurchaseStripeWithPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPurchaseStripeWithPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
