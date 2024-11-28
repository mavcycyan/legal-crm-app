import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdvocatesCardInterface} from "../../../../models/advocates/advocates-card.interface";
import {
  AdvocateCasesInterface,
  AdvocateCasesInterfaceRequest
} from "../../../../models/advocates/advocate-cases.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";

@Component({
  selector: 'app-advocate-case-page',
  templateUrl: './advocate-case-page.component.html',
  styleUrls: ['./advocate-case-page.component.scss']
})
export class AdvocateCasePageComponent  implements OnInit, OnDestroy {
  subAdvocate$: Subscription = {} as Subscription;

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
          this.advocateService.getAdvocateCases(1, params['category']).subscribe((list: AdvocateCasesInterfaceRequest) => {
            this.cases = list.data;
          });
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }
}
