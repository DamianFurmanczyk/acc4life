"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckoutDialogComponent = void 0;
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var CheckoutDialogComponent = /** @class */ (function () {
    function CheckoutDialogComponent(DataAccessService, fb, redirectService) {
        var _this = this;
        this.DataAccessService = DataAccessService;
        this.fb = fb;
        this.redirectService = redirectService;
        this.checkoutToggle = new core_1.EventEmitter();
        this.changeOrderQuantity = new core_1.EventEmitter();
        this.cardReady = false;
        this.invalidError = '';
        this.extraData = {
            "name": null,
            "address_city": null,
            "address_line1": null,
            "address_line2": null,
            "address_state": null,
            "address_zip": null
        };
        this.showCouponInputFlag = false;
        this.dynamicSectionActiveView = 'info';
        this.regionsIdToNameMap = {};
        this.displayEmailField = false;
        this.email = '';
        this.discount = 0;
        this.showPopup = false;
        this.contentForNotif = '';
        this.discountCode = '';
        this.showDiscountText = false;
        this.emailForm = this.fb.group({
            email: ['', [forms_1.Validators.email, forms_1.Validators.required]]
        });
        this.couponForm = this.fb.group({
            coupon: ['']
        });
        this.emailForm.controls.email.valueChanges.subscribe(function (val) { return _this.email = val.trim(); });
        this.couponForm.controls.coupon.valueChanges.subscribe(function (val) {
            if (!val)
                return;
            _this.discount = _this.coupons[1][val.trim().toLowerCase()] || 0;
            _this.discountCode = val;
        });
    }
    Object.defineProperty(CheckoutDialogComponent.prototype, "regions", {
        set: function (regions) {
            var _this = this;
            regions.forEach(function (el) { return _this.regionsIdToNameMap[el.id] = el.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckoutDialogComponent.prototype, "selectedAccount", {
        set: function (acc) {
            this.selAccount = acc;
            this.pricePer1acc = acc.priceAfterConversion;
            this.evaluatePrice();
        },
        enumerable: false,
        configurable: true
    });
    ;
    CheckoutDialogComponent.prototype.attemptToActivateCoupon = function () {
        if (+this.discount > 0) {
            this.contentForNotif = "Claimed coupon <b>'" + (this.discountCode[0].toUpperCase() + this.discountCode.substr(1)) + "'</b> for <b>" + this.discount + "%</b> discount.";
            this.showPopup = true;
            this.showDiscountText = true;
            this.evaluatePrice();
        }
        else {
            this.contentForNotif = "Coupon is invalid.";
            this.showPopup = true;
            this.evaluatePrice();
        }
    };
    CheckoutDialogComponent.prototype.initiateStripePayment = function () {
        var selAcc = this.selAccount;
        this.redirectService.post({
            region: this.selRegion.name, name: selAcc.name, currency: this.currency.name,
            price: this.price, quantity: selAcc.orderQty, country: this.country
        }, 'https://payment.accounts4life.com');
    };
    CheckoutDialogComponent.prototype.onToggleNotifDisplay = function () {
        this.showPopup = false;
    };
    CheckoutDialogComponent.prototype.onInitiatePaypalPayment = function () {
        var selAcc = this.selAccount;
        this.DataAccessService.initiatePaypalPayment(this.price, this.currency.name, selAcc.orderQty, selAcc.name).then(function (res) {
            window.open(res, '_self');
        });
    };
    CheckoutDialogComponent.prototype.evaluatePrice = function () {
        var newPrice = this.pricePer1acc * this.selAccount.orderQty * (this.selAccount.orderQty > 1 ? .9 : 1);
        newPrice = this.discount == 0 ? newPrice : newPrice - newPrice * (this.discount / 100);
        this.price = +(newPrice.toFixed(2));
    };
    CheckoutDialogComponent.prototype.onChangeOrderQuantity = function (q, id) {
        this.changeOrderQuantity.emit({ q: q, id: id, selectedAccIsTarget: true });
        this.evaluatePrice();
    };
    CheckoutDialogComponent.prototype.hideFormAndToggleDisplayAfter = function () {
        var _this = this;
        this.popup.nativeElement.classList.remove('active');
        setTimeout(function () {
            _this.checkoutToggle.emit();
        }, 350);
    };
    CheckoutDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.popup.nativeElement.classList.add('active');
        }, 10);
    };
    CheckoutDialogComponent.prototype.toggleCouponInputDisplay = function () {
        this.discount = 0;
        this.evaluatePrice();
        this.showCouponInputFlag = !this.showCouponInputFlag;
        if (this.showCouponInputFlag == false) {
            this.couponForm.controls.coupon.reset();
        }
    };
    __decorate([
        core_1.ViewChild('popup')
    ], CheckoutDialogComponent.prototype, "popup");
    __decorate([
        core_1.Output()
    ], CheckoutDialogComponent.prototype, "checkoutToggle");
    __decorate([
        core_1.Input()
    ], CheckoutDialogComponent.prototype, "selRegion");
    __decorate([
        core_1.Input()
    ], CheckoutDialogComponent.prototype, "country");
    __decorate([
        core_1.Input()
    ], CheckoutDialogComponent.prototype, "regions");
    __decorate([
        core_1.Input()
    ], CheckoutDialogComponent.prototype, "selectedAccount");
    __decorate([
        core_1.Input()
    ], CheckoutDialogComponent.prototype, "currency");
    __decorate([
        core_1.Input()
    ], CheckoutDialogComponent.prototype, "coupons");
    __decorate([
        core_1.Output()
    ], CheckoutDialogComponent.prototype, "changeOrderQuantity");
    CheckoutDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout-dialog',
            templateUrl: './checkout-dialog.component.html',
            styleUrls: ['./checkout-dialog.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CheckoutDialogComponent);
    return CheckoutDialogComponent;
}());
exports.CheckoutDialogComponent = CheckoutDialogComponent;
