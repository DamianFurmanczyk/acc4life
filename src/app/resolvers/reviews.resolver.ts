import { ReviewsFacade } from './../core/state/facades/reviews.facade';
import { filter, first, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Resolve, Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
@Injectable()
export class ReviewsInitiateResolver implements Resolve<Subscription> {
  constructor(private facade: ReviewsFacade, private router: Router) {}

  resolve() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      first(),
      tap(() => {
        if(this.router.url == '/reviews') return;
    
        this.facade.loadReviews();
      })).subscribe();
  }
}