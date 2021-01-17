import { translations } from './../../../core/mappers/translations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-perks-list',
  templateUrl: './perks-list.component.html',
  styleUrls: ['./perks-list.component.scss']
})
export class PerksListComponent {
  @Input() set activeTranslationHandler(t) {
    if(translations[t]) this.activeTranslation = translations[t];
  }
  activeTranslation: typeof translations.EN = translations.EN;
}
