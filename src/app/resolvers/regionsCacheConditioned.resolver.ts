import { Region } from './../models/region.interface';
import { AppFacade } from './../core/state/facades/app.facade';
import { Actions, ofType } from '@ngrx/effects';
import { map, take, first, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { of } from 'rxjs';
import { fromAppActions } from '../core/state/app.actions';

@Injectable()
export class RegionsCacheConditionedResolver implements Resolve<Region[]> {
  constructor(private facade: AppFacade, private action$: Actions) {}

  resolve() {

    return this.facade.regions$.pipe(
        first(),
        mergeMap((regions: any ) => {
          if(regions == null) {
            this.facade.loadRegions();

                return this.action$.pipe(
                  ofType(fromAppActions.Types.LoadRegionsSuccess, fromAppActions.Types.LoadRegionsFail),
                  map((a: fromAppActions.LoadRegionsSuccess) => a.payload),
                  take(1)
                );
            } else {
                return of(regions);
            }
        })
    );

  }
}