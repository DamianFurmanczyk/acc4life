import { translations } from './../../../core/mappers/translations';
import { AppFacade } from './../../../core/state/facades/app.facade';
import { DataAccessService } from './../../../core/services/app.service';
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
  @Input() set activeTranslationHandler(t) {
    console.log(translations[t])
    if(translations[t]) this.activeTranslation = translations[t];
  }
  @Input() currencyLoadingErr;
  @Input() currencyLoading;
  @Input() set currencySetHandler(excludeCurr: { name: string, exchangeRateToDollar: number, country: string }) {
    if(!excludeCurr) return;
    if(['PL', 'ES', 'DE', 'EN'].includes(excludeCurr.country)) this.setActiveFlagOption(excludeCurr.country);
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

  activeTranslation: typeof translations.EN = translations.EN;
  translations = translations;
  initialCurrencyBasedOnIp: string;
  hasCurrencyBeenSetBasedOnIpFlag = false;
  initialCurrencyOptions = ['USD', 'GBP', 'EUR'];
  scrollActiveNavAnyways: boolean;
  activeClassScrollSet: boolean
  activeClassSet: boolean;
  dropOpen = [false, false, false];
  activeCurrency = '';
  currencyOptions = this.initialCurrencyOptions;
  currencyOptionsToDisplay: string[] = ['USD', 'GBP', 'EUR'];
  currencySymbolMap = CountryToCurrencyAbbrevMap;
  flagOptionsToDisplay = ['PL', 'ES', 'DE'];
  flagOptionActive = 'EN';

  constructor(private scrollSer: ScrollService, private daS: DataAccessService, private facade: AppFacade) { }

  setActiveFlagOption(name: string) {
    const flagOptionsToDisplayWithNoSelected = this.flagOptionsToDisplay.filter(el => {
      return el != name;
    });

    this.flagOptionsToDisplay = [...flagOptionsToDisplayWithNoSelected, this.flagOptionActive];
    this.flagOptionActive = name;
  }

  scrollTopOnNavigateAndDismiss() {
    this.hideNavUl();
    this.scrollSer.scrollToTopOnNavigate();
  }

  toggleLang(name) {
    this.setActiveFlagOption(name);
    this.facade.activeTranslation$.next(name);
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
