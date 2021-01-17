import { translations } from './../../../core/mappers/translations';
import { Region } from './../../../models/region.interface';
import { tap, takeUntil } from 'rxjs/operators';
import { AppFacade } from './../../../core/state/facades/app.facade';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-region-selection',
  templateUrl: './region-selection.component.html',
  styleUrls: ['./region-selection.component.scss']
})

export class RegionSelectionComponent implements OnInit, OnDestroy {
  set selectedRegion(region: Region) {
    this.selectedRegionSet = region;
  };
  @Input() set activeTranslationHandler(t) {
    if(translations[t]) this.activeTranslation = translations[t];
  }
  activeTranslation: typeof translations.EN = translations.EN;
  destroyed$: Subject<boolean> = new Subject();

  regions: Region[];
  selectedRegionSet: Region;

  constructor(public facade: AppFacade) { }

  selectRegion(region: number) {
    this.facade.SelectRegion(region);
  }

  ngOnInit(): void {
    this.facade.selectedRegion$.pipe(
      tap(res => this.selectedRegion = res),
      takeUntil(this.destroyed$)
    ).subscribe();

    this.facade.regions$.pipe(
      tap(res => this.regions = res),
      takeUntil(this.destroyed$)
    ).subscribe();

  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

}
