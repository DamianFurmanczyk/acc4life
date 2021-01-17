import { translations } from './../../../core/mappers/translations';
import { AddReviewFormPresenterService } from './add-review-form.presenter';
import { ReviewToAdd } from './../../../models/reviewToAdd.interface';
import { Component, Output, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-review-form',
  templateUrl: './add-review-form.component.html',
  styleUrls: ['./add-review-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AddReviewFormPresenterService]
})
export class AddReviewFormComponent implements AfterViewInit {
  @ViewChild('form') form: ElementRef;
  @Output() toggleAddReviewForm = new EventEmitter<void>();
  @Output() addReview = new EventEmitter<ReviewToAdd>();
  @Input() set activeTranslationHandler(t) {
    if(translations[t]) this.activeTranslation = translations[t];
  }

  reviewForm: FormGroup;
  activeTranslation: typeof translations.EN = translations.EN;

  get f() { return this.reviewForm.controls}

  constructor(public presenter: AddReviewFormPresenterService) {
    this.reviewForm = this.presenter.reviewForm;
  }

  hideFormAndToggleDisplayAfter() {
    this.form.nativeElement.classList.remove('active');
    setTimeout(() => {
      this.toggleAddReviewForm.emit();
    }, 350);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.form.nativeElement.classList.add('active');
    }, 10);
  }

}
