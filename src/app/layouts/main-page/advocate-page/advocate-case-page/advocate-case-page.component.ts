import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdvocatesCardInterface} from "../../../../models/advocates/advocates-card.interface";
import {
  AdvocateCasesInterface,
  AdvocateCasesInterfaceRequest
} from "../../../../models/advocates/advocate-cases.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";
import {MainService} from "../../../../services/main/main.service";
import {AdvocateCategoryInterfaceRequest} from "../../../../models/advocates/advocate-categories.interface";

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
              private advocateService: AdvocateService,
              private mainService: MainService) {
  }


  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          const id = this.route.parent?.snapshot.params['id'];
          const advocateId: number = (id !== 'personal') ? id : 1;
          this.advocateService.getAdvocateCases(advocateId, params['category']).subscribe((list: AdvocateCasesInterfaceRequest) => {
            this.advocateService.getCategoryBySlug(params['category']).subscribe((data: AdvocateCategoryInterfaceRequest) => {
              let data_id: number|null = (data.data.id !== undefined) ? data.data.id.valueOf() : null;
              this.mainService.setEditBtnData({type: 'advocate_category', id: data_id});
              this.mainService.setEditBtnSecondaryData({type: 'advocate_case', id: null});
            });
            this.cases = list.data;
          });
          this.mainService.setPreloaderState(false);
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }
}
