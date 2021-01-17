import { translations } from './../../../core/mappers/translations';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-cookie-consent-bar',
  templateUrl: './cookie-consent-bar.component.html',
  styleUrls: ['./cookie-consent-bar.component.scss']
})
export class CookieConsentBarComponent {
  @Output() dismissCookiesBarAndSetCookie = new EventEmitter();
  @Input() set activeTranslationHandler(t) {
    console.log(translations[t])
    if(translations[t]) this.activeTranslation = translations[t];
  }

  triggerTransition;
  activeTranslation: typeof translations.EN = translations.EN;

  constructor() { }

  transitionAndDismiss() {
    this.triggerTransition = true;
    setTimeout(() => {
      this.dismissCookiesBarAndSetCookie.emit();
    }, 400);
  }

}
