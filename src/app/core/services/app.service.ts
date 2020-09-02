import { ReviewToAdd } from './../../models/reviewToAdd.interface';
import { AppFacade } from './../state/facades/app.facade';
import { Review } from './../../models/reviews.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CookiesAppService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  constructor(
    private http: HttpClient,
    private facade: AppFacade,
    private cookiesAppService: CookiesAppService
  ) {
    this.facade.selectedRegion$.pipe(
      tap(res => this.selectedRegion = res)
    ).subscribe();
  }

  selectedRegion: any = {};
  apiUrl = 'https://api.abcleague.webup-dev.pl/';

  getCurrencyAdequateToUsersCountry() {
    return this.http.get<string>(this.apiUrl + 'currency');
  }

  verifyOrder(id: string) {
    return this.http.get(this.apiUrl + `verify/${id}`);
  }

  getExchangeRateToDollar(currency: string) {
    return this.http.get(this.apiUrl + `convert/1/USD/${currency}`);
  }

  getReviews() {
    return forkJoin(this.http.get<Review[]>(this.apiUrl + 'reviews'),
      this.http.get<Review[]>(this.apiUrl + 'reviews/' + this.cookiesAppService.randCookie)).pipe(map(res => [...res[0], ...res[1]]));
  }

  getCoupons() {
    return this.http.get(this.apiUrl + 'coupon')
  }

  getAvgReviewRating() {
    return forkJoin(this.http.get(this.apiUrl + 'reviews/sum'), 
      this.http.get(this.apiUrl + 'reviewssum/' + this.cookiesAppService.randCookie)).pipe(map(res => {
        let newResp = [];
        // res[x][0] - avg rating, res[x][1] - rating count
        newResp[0] = ((res[0][0] * res[0][1] + res[1][0] * res[1][1]) / (res[0][1] + res[1][1])).toFixed(2);
        newResp[1] = res[0][1] + res[1][1];
        return newResp;
      }));
  }

  getAccounts() {
    return this.selectedRegion.id ? this.http.get<Account[]>(this.apiUrl + 'accounts/region/' + this.selectedRegion.id) :
      this.http.get<Account[]>(this.apiUrl + 'accounts/regionname/' + this.selectedRegion.name);
  }

  getRegions() {
    return this.http.get(this.apiUrl + 'regions');
  }

  addReview(review: ReviewToAdd) {
    return this.http.get(this.apiUrl + `reviews/add/${review.tekst}/${review.author}/${review.stars}/${this.cookiesAppService.randCookie}`);
  }

  initiatePaypalPayment(price: number | string, currency: string, quantity: number, description: string,) {
    return fetch(
      `https://api.abcleague.webup-dev.pl/pay_paypal?region=${this.selectedRegion.name}&description=${description}&price=${price}&currency=${currency}&quantity=${quantity}`,
      { method: "post" })
      .then(res => res.json());
  }
}
