import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdvocatesCardInterface} from "../../../../models/advocates/advocates-card.interface";
import {AdvocateCasesInterface} from "../../../../models/advocates/advocate-cases.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";
import {AdvocateWorksInterface} from "../../../../models/advocates/advocate-works.interface";

@Component({
  selector: 'app-advocate-case-card',
  templateUrl: './advocate-case-card.component.html',
  styleUrls: ['./advocate-case-card.component.scss']
})
export class AdvocateCaseCardComponent  implements OnInit, OnDestroy {
  subAdvocate$: Subscription = {} as Subscription;
  case: AdvocateCasesInterface = {} as AdvocateCasesInterface;
  works: AdvocateWorksInterface[] = [];

  constructor(private route: ActivatedRoute,
              private advocateService: AdvocateService) {
  }


  ngOnInit(): void {
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.case = this.advocateService.getAdvocateCase(params['case_id']);
          this.works = this.advocateService.getAdvocateWorks(params['case_id'])
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }
}
