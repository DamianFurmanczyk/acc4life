import { ReviewToAdd } from './../../models/reviewToAdd.interface';
import { Action } from '@ngrx/store';

export namespace fromAppActions {
  export enum Types {
    loadCurrencyBasedOnLocation = 'Load Currency Based On Location',
    loadCurrencyBasedOnLocationSuccess = 'Load Currency Based On Location Success',
    loadCurrencyBasedOnLocationFail = 'Load Currency Based On Location Fail',

    LoadCurrency =  'Load Currency',
    LoadCurrencySuccess =  'Load Currency Success',
    LoadCurrencyFail =  'Load Currency Fail',

    LoadReviews =  'Load Reviews',
    LoadReviewsSuccess =  'Load Reviews Success',
    LoadReviewsFail =  'Load Reviews Fail',

    AddReview =  'Add Review',
    AddReviewSuccess =  'Add Review Success',
    AddReviewFail =  'Add Review Fail',

    LoadRegions =  'Load Regions',
    LoadRegionsSuccess =  'Load Regions Success',
    LoadRegionsFail =  'Load Regions Fail',

    LoadReviewsRatingAvg =  'Load Reviews Rating Avg',
    LoadReviewsRatingAvgSuccess =  'Load Reviews Rating Avg Success',
    LoadReviewsRatingAvgFail =  'Load Reviews Rating Avg Fail',

    LoadCoupons =  'Load Coupons',
    LoadCouponsSuccess =  'Load Coupons Success',
    LoadCouponsFail =  'Load Coupons Fail',

    LoadAccounts =  'Load Accounts',
    LoadAccountsSuccess =  'Load Accounts Success',
    LoadAccountsFail =  'Load Accounts Fail',

    SelectRegion =  'Select Regions'
  }

  export class SelectRegion implements Action {
    readonly type = Types.SelectRegion;

    constructor(public payload) {}
  }
  export class LoadAccounts implements Action {
    readonly type = Types.LoadAccounts;

    constructor() {}
  }
  export class LoadAccountsSuccess implements Action {
    readonly type = Types.LoadAccountsSuccess;

    constructor(public payload) {}
  }
  export class LoadAccountsFail implements Action {
    readonly type = Types.LoadAccountsFail;

    constructor(public payload) {}
  }
  export class LoadCoupons implements Action {
    readonly type = Types.LoadCoupons;

    constructor() {}
  }
  export class LoadCouponsSuccess implements Action {
    readonly type = Types.LoadCouponsSuccess;

    constructor(public payload) {}
  }
  export class LoadCouponsFail implements Action {
    readonly type = Types.LoadCouponsFail;

    constructor(public payload) {}
  }
  export class LoadReviewsRatingAvg implements Action {
    readonly type = Types.LoadReviewsRatingAvg;

    constructor() {}
  }
  export class LoadReviewsRatingAvgSuccess implements Action {
    readonly type = Types.LoadReviewsRatingAvgSuccess;

    constructor(public payload) {}
  }
  export class LoadReviewsRatingAvgFail implements Action {
    readonly type = Types.LoadReviewsRatingAvgFail;

    constructor(public payload) {}
  }
  
  export class AddReview implements Action {
    readonly type = Types.AddReview;

    constructor(public payload: ReviewToAdd) {}
  }
  export class AddReviewSuccess implements Action {
    readonly type = Types.AddReviewSuccess;

    constructor(public payload) {}
  }
  export class AddReviewFail implements Action {
    readonly type = Types.AddReviewFail;

    constructor(public payload) {}
  }
  export class LoadCurrency implements Action {
    readonly type = Types.LoadCurrency;

    constructor(public payload: string) {}
  }
  export class LoadCurrencySuccess implements Action {
    readonly type = Types.LoadCurrencySuccess;

    constructor(public payload) {}
  }
  export class LoadCurrencyFail implements Action {
    readonly type = Types.LoadCurrencyFail;

    constructor(public payload) {}
  }
  export class LoadRegions implements Action {
    readonly type = Types.LoadRegions;

    constructor() {}
  }
  export class LoadRegionsSuccess implements Action {
    readonly type = Types.LoadRegionsSuccess;

    constructor(public payload) {}
  }
  export class LoadRegionsFail implements Action {
    readonly type = Types.LoadRegionsFail;

    constructor(public payload) {}
  }

  export class LoadReviews implements Action {
    readonly type = Types.LoadReviews;

    constructor() {}
  }
  export class LoadReviewsSuccess implements Action {
    readonly type = Types.LoadReviewsSuccess;

    constructor(public payload) {}
  }
  export class LoadReviewsFail implements Action {
    readonly type = Types.LoadReviewsFail;

    constructor(public payload) {}
  }
  export class loadCurrencyBasedOnLocation implements Action {
    readonly type = Types.loadCurrencyBasedOnLocation;

    constructor() {}
  }

  export class loadCurrencyBasedOnLocationSuccess implements Action {
    readonly type = Types.loadCurrencyBasedOnLocationSuccess;

    constructor(public payload) {}
  }

  export class loadCurrencyBasedOnLocationFail implements Action {
    readonly type = Types.loadCurrencyBasedOnLocationFail;

    constructor(public payload) {}
  }

  export type CollectiveType =
    | loadCurrencyBasedOnLocation
    | loadCurrencyBasedOnLocationSuccess
    | LoadReviews
    | LoadReviewsSuccess
    | LoadReviewsFail
    | loadCurrencyBasedOnLocationFail
    | LoadRegions
    | LoadRegionsSuccess
    | LoadRegionsFail
    | LoadAccounts
    | LoadAccountsSuccess
    | LoadAccountsFail
    | LoadCoupons
    | LoadCouponsSuccess
    | LoadCouponsFail
    | LoadReviewsRatingAvg
    | LoadReviewsRatingAvgSuccess
    | LoadReviewsRatingAvgFail
    | LoadCurrency
    | LoadCurrencySuccess
    | LoadCurrencyFail
    | SelectRegion
    | AddReview
    | AddReviewSuccess
    | AddReviewFail
}
