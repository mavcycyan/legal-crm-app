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
  id: number|null = null;

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

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
          this.advocateService.getAdvocateCases(advocateId, params['category'], {pag_size: this.pageSize}).subscribe((list: AdvocateCasesInterfaceRequest) => {
            this.advocateService.getCategoryBySlug(params['category']).subscribe((data: AdvocateCategoryInterfaceRequest) => {
              let data_id: number|null = (data.data.id !== undefined) ? data.data.id.valueOf() : null;
              this.id = data_id;
              this.mainService.setPreloaderState(false);
            });
            this.cases = list.data;
            if (list.all_items !== undefined) {
              this.allItems = list.all_items;
            }
          });
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }

  getList(event: number | null = null): void {
    this.mainService.setPreloaderState(true);
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          const id = this.route.parent?.snapshot.params['id'];
          const advocateId: number = (id !== 'personal') ? id : 1;
          this.pageOffset = (event !== null) ? this.pageSize * (event-1) : 0;
          this.advocateService.getAdvocateCases(advocateId, params['category'], {pag_size: this.pageSize, pag_offset: this.pageOffset}).subscribe((list: AdvocateCasesInterfaceRequest) => {
            this.advocateService.getCategoryBySlug(params['category']).subscribe((data: AdvocateCategoryInterfaceRequest) => {
              let data_id: number|null = (data.data.id !== undefined) ? data.data.id.valueOf() : null;
              this.id = data_id;
              this.mainService.setPreloaderState(false);
            });
            this.cases = list.data;
            if (list.all_items !== undefined) {
              this.allItems = list.all_items;
            }
          });
        }
      )
  }
}
