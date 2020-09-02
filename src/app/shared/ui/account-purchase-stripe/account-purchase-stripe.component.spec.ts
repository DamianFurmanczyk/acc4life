import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPurchaseStripeComponent } from './account-purchase-stripe.component';

describe('AccountPurchaseStripeComponent', () => {
  let component: AccountPurchaseStripeComponent;
  let fixture: ComponentFixture<AccountPurchaseStripeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPurchaseStripeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPurchaseStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
