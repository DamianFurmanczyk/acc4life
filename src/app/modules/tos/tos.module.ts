import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature/feature.component';
import { TosRoutingModule } from './tos-routing.module';


@NgModule({
  declarations: [FeatureComponent],
  imports: [
    TosRoutingModule,
    CommonModule
  ]
})
export class TosModule { }
