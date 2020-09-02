import { ScrollService } from './../../utils/scrolls.service';
import { Component, Input, Output, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {CountryToCurrencyAbbrevMap} from '../../../data/CountryToCurrencyAbbrevMap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavComponent  {
  @ViewChild('navUl') navUl: ElementRef;
  @ViewChild('hamburger') hamburger: ElementRef;
  @Input() set activeClass(flag:  boolean) {
    this.activeClassSet = flag;
  }
  @Input() set scrollActiveNavNoMatterWhat(flag:  boolean) {
    this.scrollActiveNavAnyways = flag;
  }
  @Input() set activeClassScroll(flag:  boolean) {
    this.activeClassScrollSet = flag;
  }
  @Input() currencyLoadingErr;
  @Input() currencyLoading;
  @Input() set currencySetHandler(excludeCurr: { name: string, exchangeRateToDollar: number }) {
    if(!excludeCurr) return;
    if(!this.hasCurrencyBeenSetBasedOnIpFlag) {
      this.currencyOptions = [...this.currencyOptions, excludeCurr.name];
      this.initialCurrencyBasedOnIp = excludeCurr.name;
      this.hasCurrencyBeenSetBasedOnIpFlag = true;
    }
    this.activeCurrency = excludeCurr.name;
    this.currencyOptionsToDisplay = this.currencyOptions.filter(el => el != excludeCurr.name);
    if(this.initialCurrencyOptions.includes(excludeCurr.name) && this.initialCurrencyOptions.includes(this.initialCurrencyBasedOnIp)) {
      this.currencyOptionsToDisplay = this.initialCurrencyOptions;
    }
  }

  @Output() currencyChange = new EventEmitter();

  initialCurrencyBasedOnIp: string;
  hasCurrencyBeenSetBasedOnIpFlag = false;
  initialCurrencyOptions = ['USD', 'GBP', 'EUR'];
  scrollActiveNavAnyways: boolean;
  activeClassScrollSet: boolean
  activeClassSet: boolean;
  dropOpen = [false, false];
  activeCurrency = '';
  currencyOptions = this.initialCurrencyOptions;
  currencyOptionsToDisplay: string[] = ['USD', 'GBP', 'EUR'];
  currencySymbolMap = CountryToCurrencyAbbrevMap;

  constructor(private scrollSer: ScrollService) { }

  scrollTopOnNavigateAndDismiss() {
    this.hideNavUl();
    this.scrollSer.scrollToTopOnNavigate();
  }

  scrollToPrivacyPolicyOnNavigateAndDismiss() {
    this.hideNavUl();
    this.scrollSer.navigateAndScrollToElem('.privacy-policy', 'tos');
  }

  hideNavUl() {
    this.navUl.nativeElement.classList.contains('active') && this.navUl.nativeElement.classList.remove('active');
    this.hamburger.nativeElement.classList.contains('hamburger--open') && this.hamburger.nativeElement.classList.remove('hamburger--open');
  }

  toggleDrop(i: number) {
    this.dropOpen[i] = !this.dropOpen[i];
  }

  onCurrencyChange(currency: string) {
    this.currencyChange.emit(currency)
  }

}
