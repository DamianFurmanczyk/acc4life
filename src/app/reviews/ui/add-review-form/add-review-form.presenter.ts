import { ReviewsFacade } from './../../../core/state/facades/reviews.facade';
import { ReviewToAdd } from './../../../models/reviewToAdd.interface';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable()

export class AddReviewFormPresenterService {
    reviewForm: FormGroup;
    stars = Array.from(Array(5));
    starsTouched = false;
    starsActiveNum: number;

    constructor(private formBuilder: FormBuilder, private facade: ReviewsFacade) {
      this.reviewForm = this.formBuilder.group({
        author: ['', Validators.required],
        tekst: ['', Validators.required]
      });
    }

    onStarClick(i: number) {
      this.starsActiveNum = i + 1;
      const activeStarsArr = 'active '.repeat(this.starsActiveNum).split(' ');
      activeStarsArr.pop()
      this.stars = [...activeStarsArr, ...Array(4-i)];
      this.starsTouched = true;
    }

    getReviewToAdd() {
      return <ReviewToAdd>{author: this.reviewForm.value.author.trim(), tekst: this.reviewForm.value.tekst.trim(), stars: this.starsActiveNum};
    }

    submitAddReviewForm(e: Event) {
      e.preventDefault();
      
      if(this.reviewForm.invalid && this.stars.length == 0) return;
      this.facade.addReview(this.getReviewToAdd());
      this.stars = Array.from(Array(5));
      this.reviewForm.reset();
    }
    
}
