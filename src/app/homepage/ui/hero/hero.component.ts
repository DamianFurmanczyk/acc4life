import { ScrollService } from './../../../shared/utils/scrolls.service';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent  {
  @Input() set reviewsRatingAvg(ratingData: number) {
    !ratingData ? this.reviewsNum = 0 : this.reviewsNum = ratingData[1];
  }
  @Input() reviewsAvgRatingLoadingErr;
  @Input() reviewsAvgRatingLoading; 

  stars: any = Array.from(Array(5)).map(() => '<img src="assets/img/icons/star.svg" class="icon icon--star active icon--star-header"></img>').join('');
  reviewsNum = 0;

  constructor(private scrollSer: ScrollService) { }

  navigateAndScrollToAccounts() {
    this.scrollSer.navigateAndScrollToElem('.account-options', '/accounts');
  }

  navigateAndScrollToReviews() {
    this.scrollSer.navigateAndScrollToElem('.reviews', '/reviews');
  }

}
