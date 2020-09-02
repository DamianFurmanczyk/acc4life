import { ReviewToAdd } from './../../../models/reviewToAdd.interface';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromApp from '../app.reducer';
import * as selectors from '../app.selectors';
import { fromAppActions } from '../app.actions';


@Injectable()
export class ReviewsFacade {
  reviews$ = this.store.pipe(select(selectors.getReviews));
  loadingRegions$ = this.store.pipe(select(selectors.getReviewsLoading));
  reviewsLoading$ = this.store.pipe(select(selectors.getReviewsLoading));
  reviewsLoadingErr$ = this.store.pipe(select(selectors.getReviewsLoadingErr));

  constructor(private store: Store<fromApp.AppPartialState>) {}

  loadReviews(): void {
    this.store.dispatch(
      new fromAppActions.LoadReviews()
    );
  }

  addReview(newReview: ReviewToAdd): void {
    this.store.dispatch(
      new fromAppActions.AddReview(newReview)
    );
  }
}