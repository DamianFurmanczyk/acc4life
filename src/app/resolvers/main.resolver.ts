import { AppFacade } from './../core/state/facades/app.facade';
import { Injectable } from '@angular/core';

import { Resolve, Router } from '@angular/router';

import { Subscription, of } from 'rxjs';
import { ReviewsFacade } from './../core/state/facades/reviews.facade';

@Injectable()
export class AllResourcesResolver implements Resolve<Subscription> {
  constructor(private facade: AppFacade, private router: Router, private reviewsFacade: ReviewsFacade) {}

  resolve() {
    this.facade.loadCoupons(),
    this.facade.loadRegions(),
    this.facade.loadReviewsRatingAvg(),
    this.reviewsFacade.loadReviews(),
    this.facade.loadCurrencyBasedOnLocation(),
    this.facade.LoadAccounts()

    return of(null);
  }
}