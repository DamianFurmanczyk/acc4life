import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentVerificationRoutingModule } from './payment-verification-routing.module';
import { FeatureComponent } from './feature/feature.component';


@NgModule({
  declarations: [FeatureComponent],
  imports: [
    CommonModule,
    PaymentVerificationRoutingModule
  ]
})
export class PaymentVerificationModule { }
