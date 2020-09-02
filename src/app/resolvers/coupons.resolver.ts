import { filter, first, tap } from 'rxjs/operators';
import { AppFacade } from './../core/state/facades/app.facade';
import { Injectable } from '@angular/core';

import { Resolve, Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CouponsInitiateResolver implements Resolve<Subscription> {
  constructor(private facade: AppFacade, private router: Router) {}

  resolve() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      first(),
      tap(() => {
    
        this.facade.loadCoupons();
      })).subscribe();
    }
}