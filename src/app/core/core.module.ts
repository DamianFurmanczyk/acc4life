import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotificationPopupComponent } from './../shared/ui/notification-popup/notification-popup.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

import { CookieService } from 'ngx-cookie-service';

import { MainComponent } from '../main/main.component';

import { RegionsCacheConditionedResolver } from '../resolvers/regionsCacheConditioned.resolver';
import { AccountsCacheConditionedResolver } from '../resolvers/accountsCacheConditioned.resolver';
import { ReviewsCacheConditionedResolver } from '../resolvers/reviewsCacheConditioned.resolver';
import { RegionsInitiateResolver } from '../resolvers/regions.resolver';
import { CurrencyResolver } from '../resolvers/currency.resolver';
import { ReviewsInitiateResolver } from '../resolvers/reviews.resolver';

import * as fromApp from './state/app.reducer';

import { AddReviewFormComponent } from '../reviews/ui/add-review-form/add-review-form.component';
import { ReviewsFacade } from './state/facades/reviews.facade';
import { ReviewsRatingAvgCacheConditionedResolver } from './../resolvers/reviewsRatingAvgCacheConditioned.resolver';

import { RegionSelectionComponent } from '../shared/ui/region-selection/region-selection.component';
import { PaymentMethodStripeComponent } from '../shared/ui/payment-method-stripe/payment-method-stripe.component';
import { FooterComponent } from '../shared/ui/footer/footer.component';
import { CheckoutDialogComponent } from '../shared/ui/checkout-dialog/checkout-dialog.component';
import { NavComponent } from '../shared/ui/nav/nav.component';

import { CouponsInitiateResolver } from './../resolvers/coupons.resolver';

import { CookieConsentBarComponent } from './../shared/ui/cookie-consent-bar/cookie-consent-bar.component';

import { AccountPurchaseStripeWithPopupComponent } from '../shared/smart-components/account-purchase-stripe-with-popup/account-purchase-stripe-with-popup.component';
import {AccountPurchaseStripeComponent} from '../shared/ui/account-purchase-stripe/account-purchase-stripe.component'

import {HomepageFeatureComponent} from '../homepage/feature/feature.component';
import { PerksListComponent } from '../homepage/ui/perks-list/perks-list.component';
import { HeroComponent } from '../homepage/ui/hero/hero.component';

import {AccountsFeatureComponent} from '../accounts/feature/feature.component';
import { AccountFaqComponent } from '../accounts/ui/account-faq/account-faq.component';

import {ReviewsFeatureComponent} from '../reviews/feature/feature.component';
import { ReviewsListComponent } from '../reviews/ui/reviews-list/reviews-list.component';

import { AppEffects } from './state/app.effects';
import { HttpClientModule } from '@angular/common/http';

import { DataAccessService } from './services/app.service';
import { RedirectService } from './services/redirect.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';

import { PipesModule } from './pipes/pipes.module';

import { AllResourcesResolver } from './../resolvers/main.resolver';

import { LoaderSpinnerComponent } from './../shared/loader-spinner/loader-spinner.component';
import { LoaderDotsComponent } from './../shared/loader-dots/loader-dots.component';
import { SmthWentWrongComponent } from './../shared/smth-went-wrong/smth-went-wrong.component';
@NgModule({
  declarations: [    
    MainComponent,
    SmthWentWrongComponent,
    LoaderDotsComponent,
    NotificationPopupComponent,
    AppComponent,
    AccountPurchaseStripeComponent,
    RegionSelectionComponent,
    PerksListComponent,
    ReviewsFeatureComponent,
    AccountPurchaseStripeWithPopupComponent,
    AccountsFeatureComponent,
    HeroComponent,
    HomepageFeatureComponent,
    ReviewsListComponent,
    AccountFaqComponent,
    PaymentMethodStripeComponent,
    FooterComponent,
    CheckoutDialogComponent,
    CookieConsentBarComponent,
    HomepageFeatureComponent,
    AddReviewFormComponent,
    ReviewsFeatureComponent,
    AccountsFeatureComponent,
    NavComponent,
    LoaderSpinnerComponent
  ],
  imports: [
  PerfectScrollbarModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromApp.APP_FEATURE_KEY,
      fromApp.reducer
    ),
    EffectsModule.forFeature([AppEffects])
  ],
  providers: [
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
    RedirectService,
    CookieService,
    DataAccessService,
    AllResourcesResolver,
    ReviewsFacade,
  ]
})
export class CoreModule {}
