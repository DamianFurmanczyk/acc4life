import { translations } from './../../../core/mappers/translations';
import { Router } from '@angular/router';
import { ScrollService } from './../../utils/scrolls.service';
import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('faqColumn') faqCol: ElementRef;
  @ViewChild('linksCol') linksCol: ElementRef;
  @Input() set activeTranslationHandler(t) {
    if(translations[t]) this.activeTranslation = translations[t];
  }
  activeTranslation: typeof translations.EN = translations.EN;
  dds: NodeListOf<HTMLElement>;
  explendableUlsTriggers: NodeListOf<HTMLElement>;

  constructor(private scrollSer: ScrollService, private router: Router) {}

  navigateToRoute(route: string) {
    this.scrollSer.scrollToTopOnNavigate();
    this.router.navigate([route]);
  }

  navigateAndScrollToAccounts() {
    this.scrollSer.navigateAndScrollToElem('.account-options', '/accounts');
  }

  navigateAndScrollToReviews() {
    this.scrollSer.navigateAndScrollToElem('.reviews', '/reviews');
  }

  navigateAndScrollToPrivacyPolicy() {
    this.scrollSer.navigateAndScrollToElem('.privacy-policy', '/terms-and-conditions');
  }

  ngAfterViewInit() {
    this.faqCol.nativeElement.querySelectorAll('dt').forEach((el: HTMLElement) => el.addEventListener('click', toggleSiblingActiveClass))
    this.dds = this.faqCol.nativeElement.querySelectorAll('dd');
    this.explendableUlsTriggers = this.linksCol.nativeElement.querySelectorAll('.trigger');
    this.explendableUlsTriggers.forEach((el: HTMLElement) => el.addEventListener('click', toggleChildrenActiveClass));
    const FooterComponent = this;

    function  toggleSiblingActiveClass() {
      const siblAlreadyActiveFlag = <HTMLElement>this.nextSibling.classList.contains('active');
      FooterComponent.dds.forEach(el => el.classList.remove('active'));

      if(!siblAlreadyActiveFlag) <HTMLElement>this.nextSibling.classList.add('active');
    }

    function toggleChildrenActiveClass() {
      const childAlreadyActiveFlag = <HTMLElement>this.classList.contains('active');

      FooterComponent.explendableUlsTriggers.forEach(el => el.classList.remove('active'));

      if(!childAlreadyActiveFlag) <HTMLElement>this.classList.add('active');
    }
  }



}
