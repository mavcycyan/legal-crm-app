import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdvocatesCardInterface} from "../../../../models/advocates/advocates-card.interface";
import {AdvocateCasesInterface} from "../../../../models/advocates/advocate-cases.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";

@Component({
  selector: 'app-advocate-case-page',
  templateUrl: './advocate-case-page.component.html',
  styleUrls: ['./advocate-case-page.component.scss']
})
export class AdvocateCasePageComponent  implements OnInit, OnDestroy {
  subAdvocate$: Subscription = {} as Subscription;
  advocate: AdvocatesCardInterface = {} as AdvocatesCardInterface;

  cases: AdvocateCasesInterface[] = [];
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'visit_date', name: 'Дата звернення'},
    {slug: 'proc_num', name: 'Номер справи'},
    {slug: 'plot', name: 'Фабула'},
    {slug: 'fee', name: 'Гонорар'},
    {slug: 'pays', name: 'Виплати'},
    {slug: 'result', name: 'Статус'}
  ];

  constructor(private route: ActivatedRoute,
              private advocateService: AdvocateService) {
  }


  ngOnInit(): void {
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          const advocateId: number = (params['id'] !== 'personal') ? params['id'] : 0;
          this.advocate = this.advocateService.getOne(advocateId);
          this.cases = this.advocateService.getAdvocateCases(0, params['category'])
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }
}
