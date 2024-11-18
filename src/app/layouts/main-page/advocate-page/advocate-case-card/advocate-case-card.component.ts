import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";
import {AdvocateWorksInterface} from "../../../../models/advocates/advocate-works.interface";
import {
  AdvocateCaseCardInterface,
  AdvocateCaseCardInterfaceRequest
} from "../../../../models/advocates/advocate-cases-card.interface";

@Component({
  selector: 'app-advocate-case-card',
  templateUrl: './advocate-case-card.component.html',
  styleUrls: ['./advocate-case-card.component.scss']
})
export class AdvocateCaseCardComponent  implements OnInit, OnDestroy {
  subAdvocate$: Subscription = {} as Subscription;
  case: AdvocateCaseCardInterface = {} as AdvocateCaseCardInterface;
  works: AdvocateWorksInterface[] = [];
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'what_done', name: 'Що зроблено'},
    {slug: 'result', name: 'Результат'}
  ];

  constructor(private route: ActivatedRoute,
              private advocateService: AdvocateService) {
  }


  ngOnInit(): void {
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.advocateService.getAdvocateCase(params['case_id']).subscribe((advcase: AdvocateCaseCardInterfaceRequest) => {
            this.case = advcase.data;
            this.works = (advcase.data.advocate_works !== undefined) ? advcase.data.advocate_works : [];
          });
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }
}
