import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APP_FEATURE_KEY,
  reviewsAdapter,
  AppPartialState,
  AppStateInterface
} from './app.reducer';

export const getAppState = createFeatureSelector<
  AppPartialState,
  AppStateInterface
>(APP_FEATURE_KEY);

const { selectAll } = reviewsAdapter.getSelectors();

export const getCurrency = createSelector(
  getAppState,
  (state: AppStateInterface) => state.currency
);

export const getCountry = createSelector(
  getAppState,
  (state: AppStateInterface) => state.country
);

export const getCurrencyLoadingErr = createSelector(
  getAppState,
  (state: AppStateInterface) => state.currencyLoadingErr
);

export const getReviewsLoadingErr = createSelector(
  getAppState,
  (state: AppStateInterface) => state.reviewsLoadingErr
);

export const getAccountsLoadingErr = createSelector(
  getAppState,
  (state: AppStateInterface) => state.accountsLoadingErr
);

export const getReviewsAvgRatingError = createSelector(
  getAppState,
  (state: AppStateInterface) => state.reviewsAvgRatingError
);

export const getRegionsLoadingErr = createSelector(
  getAppState,
  (state: AppStateInterface) => state.currencyLoadingErr
);

export const getCoupons = createSelector(
  getAppState,
  (state: AppStateInterface) => state.coupons
);

export const getReviewsRatingAvg = createSelector(
  getAppState,
  (state: AppStateInterface) => state.reviewsAvgRating
);

export const getReviewsLoading = createSelector(
  getAppState,
  (state: AppStateInterface) => state.reviewsLoading
);

export const getRegionsLoading = createSelector(
  getAppState,
  (state: AppStateInterface) => state.regionsLoading
);

export const getCurrencyLoading = createSelector(
  getAppState,
  (state: AppStateInterface) => state.currencyLoading
);

export const getAccountsLoading = createSelector(
  getAppState,
  (state: AppStateInterface) => state.accountsLoading
);

export const getReviewsAvgRatingLoading = createSelector(
  getAppState,
  (state: AppStateInterface) => state.reviewsAvgRatingLoading
);

export const getReviews = createSelector(
  getAppState,
  (state: AppStateInterface) => selectAll(state.reviews)
);

export const getRegions = createSelector(
  getAppState,
  (state: AppStateInterface) => state.regions
);


export const getAccounts = createSelector(
  getAppState,
  (state: AppStateInterface) => state.accounts
);

export const getSelectedRegion = createSelector(
  getAppState,
  (state: AppStateInterface) => state.selectedRegion
);
