import { translations } from './../../../core/mappers/translations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region } from './../../../models/region.interface';
import { currencyData } from './../../../models/currencyData.interface';
import { DataAccessService } from './../../../core/services/app.service';
import { AccountWithCountAndOrderQty } from './../../../models/accountExtended.interface';
import { Component, Output, AfterViewInit, ViewChild, ElementRef, Input, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { RedirectService } from './../../../core/services/redirect.service';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckoutDialogComponent implements AfterViewInit {
  @ViewChild('popup') popup: ElementRef;
  @Output() checkoutToggle = new EventEmitter();
  @Input() selRegion: Region;
  @Input() country: string;
  @Input() set regions(regions: Region[]) {
    regions.forEach((el: Region) => this.regionsIdToNameMap[el.id] = el.name);
  }
  @Input() set selectedAccount(acc: AccountWithCountAndOrderQty) {
    this.selAccount = acc;
    this.pricePer1acc = acc.priceAfterConversion;
    this.evaluatePrice();
  };
  @Input() currency: currencyData;
  @Input() coupons: [string[], {}];
  @Output() changeOrderQuantity: EventEmitter<{ q: number, id: number, selectedAccIsTarget: boolean }> = new EventEmitter();
  cardReady = false;
  showLoader = false;
  invalidError = '';
  extraData = {
    "name": null,
    "address_city": null,
    "address_line1": null,
    "address_line2": null,
    "address_state": null,
    "address_zip": null
  };
  @Input() set activeTranslationHandler(t) {
    if(translations[t]) this.activeTranslation = translations[t];
  }
  activeTranslation: typeof translations.EN = translations.EN;

  selAccount: AccountWithCountAndOrderQty;
  showCouponInputFlag: boolean = false;

  dynamicSectionActiveView = 'info';

  regionsIdToNameMap = {};
  displayEmailField = false;
  emailForm: FormGroup;
  couponForm: FormGroup;
  email = '';
  discount = 0;
  pricePer1acc: number;
  price: number;
  showPopup = false;
  contentForNotif = '';
  discountCode = '';
  showDiscountText = false;
  showErrPopup = false;
  errPopupMsg = '';

  constructor(private DataAccessService: DataAccessService, private fb: FormBuilder, private redirectService: RedirectService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      fullname: ['', [Validators.required]]
    });
    this.couponForm = this.fb.group({
      coupon: ['']
    });
    this.emailForm.controls.email.valueChanges.subscribe((val: string) => this.email = val.trim());
    this.couponForm.controls.coupon.valueChanges.subscribe(
      (val: string) => {
        if (!val) return;
        this.discount = this.coupons[1][val.trim().toLowerCase()] || 0;
        this.discountCode = val;
      }
    );
  }

  bitcoinPayment() {
    this.emailForm.valid && alert('pay or ');
  }

  attemptToActivateCoupon() {
    if (+this.discount > 0) {
      this.contentForNotif = `Claimed coupon <b>'${this.discountCode[0].toUpperCase() + this.discountCode.substr(1)}'</b> for <b>${this.discount}%</b> discount.`;
      this.showPopup = true;
      this.showDiscountText = true;
      this.evaluatePrice();
    } else {
      this.contentForNotif = `Coupon is invalid.`;
      this.showPopup = true;
      this.evaluatePrice();
    }
  }

  initiateStripePayment() {
    const selAcc = this.selAccount;
    this.redirectService.post({
      region: this.selRegion.name, name: selAcc.name, currency: this.currency.name,
      price: this.price, quantity: selAcc.orderQty, country: this.country
    },
      'https://payment.accounts4life.com');
  }

  onToggleNotifDisplay() {
    this.showPopup = false;
  }

  onInitiatePaypalPayment() {
    this.showLoader = true;
    const selAcc = this.selAccount;
    const comp = this;

    let altCurrency;
    if(['BGN', 'HKR', 'RON', 'TRY'].includes(this.country)) {
      altCurrency = 'EUR';
    } else if(['ARS', 'ISK'].includes(this.country)) {
      altCurrency = 'USD';
    }

    this.DataAccessService.initiatePaypalPayment(this.price, altCurrency ? altCurrency : this.currency.name, selAcc.orderQty, selAcc.name).then(res => {
      this.showLoader = !this.showLoader;

      console.log(res);

      if (res.original.status == 'success'){
      window.open(
        res.original.message,
        '_self'
      );
      } else {
        window.open(
          window.location.href,
          '_self'
        );
      }
    });
  }

  evaluatePrice() {
    var newPrice = this.pricePer1acc * this.selAccount.orderQty * (this.selAccount.orderQty > 1 ? .9 : 1);
    newPrice = this.discount == 0 ? newPrice : newPrice - newPrice * (this.discount / 100);
    this.price = +(newPrice.toFixed(2));
  }

  onChangeOrderQuantity(q: number, id: number) {
    this.changeOrderQuantity.emit({ q, id, selectedAccIsTarget: true });

    this.evaluatePrice();
  }

  hideFormAndToggleDisplayAfter() {
    this.popup.nativeElement.classList.remove('active');
    setTimeout(() => {
      this.checkoutToggle.emit();
    }, 350);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.popup.nativeElement.classList.add('active');
    }, 10);
  }

  toggleCouponInputDisplay() {
    this.discount = 0;
    this.evaluatePrice();
    this.showCouponInputFlag = !this.showCouponInputFlag;
    if (this.showCouponInputFlag == false) {
      this.couponForm.controls.coupon.reset();
    }
  }

}
