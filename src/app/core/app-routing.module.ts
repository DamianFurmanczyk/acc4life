import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageFeatureComponent } from '../homepage/feature/feature.component';
import { AccountsFeatureComponent } from '../accounts/feature/feature.component';
import { ReviewsFeatureComponent } from '../reviews/feature/feature.component';

import { AllResourcesResolver } from './../resolvers/main.resolver';
import { MainComponent } from './../main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: {
      AllResourcesResolver
    },
    children: [
      {
        path: 'payment/:paymentId',
        loadChildren: () => import('./../modules/payment-verification/payment-verification.module').then(m => m.PaymentVerificationModule)
      },
      {
        path: 'tos',
        loadChildren: () => import('./../modules/tos/tos.module').then(m => m.TosModule)
      },
      {
        path: 'terms-and-conditions',
        loadChildren: () => import('./../modules/tos/tos.module').then(m => m.TosModule)
      },
    {
      path: '',
      component: HomepageFeatureComponent
    }, {
      path: 'reviews',
      component: ReviewsFeatureComponent
    }, {
      path: 'accounts',
      component: AccountsFeatureComponent
    }, {
      path: '**', redirectTo: ''
    }
  ]
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
