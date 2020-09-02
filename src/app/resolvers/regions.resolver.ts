import { filter, first, tap } from 'rxjs/operators';
import { AppFacade } from './../core/state/facades/app.facade';
import { Injectable } from '@angular/core';

import { Resolve, Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';

@Injectable()
export class RegionsInitiateResolver implements Resolve<Subscription> {
  constructor(private facade: AppFacade, private router: Router) {}

  resolve() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      first(),
      tap(e => {
        if(this.router.url == '/accounts' || this.router.url == '/') return;
    
        this.facade.loadRegions();
      })).subscribe();
  }
}