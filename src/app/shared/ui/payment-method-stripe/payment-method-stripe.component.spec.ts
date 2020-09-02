import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodStripeComponent } from './payment-method-stripe.component';

describe('PaymentMethodStripeComponent', () => {
  let component: PaymentMethodStripeComponent;
  let fixture: ComponentFixture<PaymentMethodStripeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMethodStripeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
