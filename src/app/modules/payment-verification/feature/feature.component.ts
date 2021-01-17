import { Subscription } from 'rxjs';
import { DataAccessService } from './../../../core/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit, OnDestroy {
  id: string;
  sub: Subscription;
  orderInfo;
  orderInfoLoading = 'loading...';

  constructor(private route: ActivatedRoute, private daService: DataAccessService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('paymentId');

    this.sub = this.daService.verifyOrder(this.id).subscribe(res => {
      if(JSON.stringify(res) == JSON.stringify({})) {
        this.orderInfo = false;
        this.orderInfoLoading = '';
      } else {
        res = {...res, code: JSON.parse(res['code']).map(el => {
          return el.code.replace(/[^a-zA-Z0-9]/g, " ").trim();
        })};
        this.orderInfo = res;
        this.orderInfoLoading = '';
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
