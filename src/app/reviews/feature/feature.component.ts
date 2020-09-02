import { ReviewToAdd } from './../../models/reviewToAdd.interface';
import { DataAccessService } from './../../core/services/app.service';
import { Observable } from 'rxjs';
import { Review } from './../../models/reviews.interface';
import { ReviewsFacade } from './../../core/state/facades/reviews.facade';
import { Component, } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class ReviewsFeatureComponent   {
  reviews$: Observable<Review[]> = this.facade.reviews$;
  showAddReviewFormFlag: boolean = false;

  onToggleAddReviewForm() {
    this.showAddReviewFormFlag = !this.showAddReviewFormFlag
  }

  constructor(public facade: ReviewsFacade, private daService: DataAccessService) { }

  onAddReview(review: ReviewToAdd) {
    this.daService.addReview(review);
  }

}
