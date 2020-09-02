import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFaqComponent } from './account-faq.component';

describe('AccountFaqComponent', () => {
  let component: AccountFaqComponent;
  let fixture: ComponentFixture<AccountFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
