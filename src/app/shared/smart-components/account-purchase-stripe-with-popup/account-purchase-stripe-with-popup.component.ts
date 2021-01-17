import { translations } from './../../../core/mappers/translations';
import { Region } from './../../../models/region.interface';
import { Account } from './../../../models/account.interface';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { currencyData } from './../../../models/currencyData.interface';
import { AccountWithCountAndOrderQty } from './../../../models/accountExtended.interface';
import { AppFacade } from './../../../core/state/facades/app.facade';
import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-account-purchase-stripe-with-popup',
  templateUrl: './account-purchase-stripe-with-popup.component.html',
  styleUrls: ['./account-purchase-stripe-with-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPurchaseStripeWithPopupComponent implements OnInit, OnDestroy {
  @Input() altStyles?: boolean = false;
  @Input() set activeTranslationHandler(t) {
    if(translations[t]) this.activeTranslation = translations[t];
  }
  activeTranslation: typeof translations.EN = translations.EN;
  accountsExtended$: BehaviorSubject<AccountWithCountAndOrderQty[]> = new BehaviorSubject([]);
  destroyed$: Subject<boolean> = new Subject();
  currency$: Observable<currencyData> = this.facade.currency$;
  selRegion$: Observable<Region> = this.facade.selectedRegion$;
  regions$: Observable<Region[]> = this.facade.regions$;
  coupons$: Observable<[string[], {}]> = this.facade.coupons$;
  country$: Observable<string> = this.facade.country$;
  selectedAccount: AccountWithCountAndOrderQty;
  set accountsSetter(accData: {acc: Account[], count: number[]}) {
    if(!accData.acc) return;

    let accounts_with_count = accData.acc.map((el, i) => {
      return { ...el, count: accData.count[i], orderQty: 1 }
    });

    accounts_with_count = accounts_with_count.filter(el => el.factory != 1);

    this.accounts = accounts_with_count;

    this.accountsExtended$.next(accounts_with_count);
  };
  accounts: AccountWithCountAndOrderQty[] = [];
  showCheckoutFlag: boolean = false;

  onToggleCheckoutFlag() {
    this.showCheckoutFlag = !this.showCheckoutFlag;
  }

  onChangeSelectedAccount(acc: AccountWithCountAndOrderQty) {
    this.selectedAccount = acc;
  }

  onChangeOrderQuantity(accData: {q: number, id: number, selectedAccIsTarget: boolean}) {
    if(accData.selectedAccIsTarget) {
      accData.id = this.accounts.indexOf(this.selectedAccount);
    }
    let targetedAccountOrderQty = this.accounts[accData.id].orderQty;
    if( (accData.q == -1 && targetedAccountOrderQty - 1 < 1) || (accData.q == 1 && targetedAccountOrderQty + 1 > this.accounts[accData.id].count)) return;
    this.accounts[accData.id].orderQty +=  accData.q;

    this.accountsExtended$.next(this.accounts);
  }

  constructor(public facade: AppFacade) {}

  ngOnInit(): void {
    this.facade.accounts$.pipe(
    tap(res => {
      this.accountsSetter = res;
    }),
    takeUntil(this.destroyed$)
  ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
