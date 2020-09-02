import { Account } from './../models/account.interface';
import { AppFacade } from './../core/state/facades/app.facade';
import { Actions, ofType } from '@ngrx/effects';
import { map, take, mergeMap, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { fromAppActions } from '../core/state/app.actions';

@Injectable()
export class AccountsCacheConditionedResolver implements Resolve<Observable<{acc: Account[], count: number[]}>> {
  constructor(private facade: AppFacade, private action$: Actions) {}
  
  resolve() {

    return this.facade.accounts$.pipe(
        first(),
        mergeMap((accounts: {acc: Account[], count: number[]} | null) => {
            if(JSON.stringify(accounts) == JSON.stringify({acc: [], count: []})) {
                this.facade.LoadAccounts();

                return this.action$.pipe(
                  ofType(fromAppActions.Types.LoadAccountsSuccess, fromAppActions.Types.LoadAccountsFail),
                  map((a: fromAppActions.LoadAccountsSuccess) => a.payload),
                  take(1)
                );
            } else {
                return of(accounts);
            }
        })
    );

  }
}