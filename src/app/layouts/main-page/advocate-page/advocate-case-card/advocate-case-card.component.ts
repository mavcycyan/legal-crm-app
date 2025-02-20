import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";
import {AdvocateWorksInterface} from "../../../../models/advocates/advocate-works.interface";
import {
  AdvocateCaseCardInterface,
  AdvocateCaseCardInterfaceRequest
} from "../../../../models/advocates/advocate-cases-card.interface";
import {MainService} from "../../../../services/main/main.service";
import {SubscribersWorksCardInterface} from "../../../../models/subscribers/subscribers-works-card.interface";

@Component({
  selector: 'app-advocate-case-card',
  templateUrl: './advocate-case-card.component.html',
  styleUrls: ['./advocate-case-card.component.scss']
})
export class AdvocateCaseCardComponent  implements OnInit, OnDestroy {
  subAdvocate$: Subscription = {} as Subscription;
  case: AdvocateCaseCardInterface = {} as AdvocateCaseCardInterface;
  id: number|null = null;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute,
              private advocateService: AdvocateService,
              private mainService: MainService) {
  }


  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.advocateService.getAdvocateCase(params['case_id']).subscribe((advcase: AdvocateCaseCardInterfaceRequest) => {
            this.id = params['case_id'];
            this.case = advcase.data;
            this.isLoading = false;
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }
}
