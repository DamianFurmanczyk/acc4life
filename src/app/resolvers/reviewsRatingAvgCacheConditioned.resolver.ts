import { Region } from '../models/region.interface';
import { AppFacade } from '../core/state/facades/app.facade';
import { Actions, ofType } from '@ngrx/effects';
import { map, take, first, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { of } from 'rxjs';
import { fromAppActions } from '../core/state/app.actions';

@Injectable()
export class ReviewsRatingAvgCacheConditionedResolver implements Resolve<Region[]> {
  constructor(private facade: AppFacade, private action$: Actions) {}

  resolve() {

    return this.facade.reviewsRatingAvg$.pipe(
        first(),
        mergeMap((reviewsRatingAvg: any ) => {
          if(reviewsRatingAvg == null) {
            this.facade.loadReviewsRatingAvg();

                return this.action$.pipe(
                  ofType(fromAppActions.Types.LoadReviewsRatingAvgSuccess, fromAppActions.Types.LoadReviewsRatingAvgFail),
                  map((a: fromAppActions.LoadReviewsRatingAvgSuccess) => a.payload),
                  take(1)
                );
            } else {
                return of(reviewsRatingAvg);
            }
        })
    );

  }
}