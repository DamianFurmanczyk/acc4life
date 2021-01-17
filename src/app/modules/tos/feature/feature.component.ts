import { Subscription } from 'rxjs';
import { translations } from './../../../core/mappers/translations';
import { AppFacade } from './../../../core/state/facades/app.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit, OnDestroy {
  activeTranslation = translations.EN;
  sub: Subscription;

  constructor(private facade: AppFacade) {

  }

  ngOnInit(): void {
    this.sub = this.facade.activeTranslation$.subscribe(t => this.activeTranslation = translations[t]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
