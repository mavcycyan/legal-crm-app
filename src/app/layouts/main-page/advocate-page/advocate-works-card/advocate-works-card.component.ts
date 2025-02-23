import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {MainService} from "../../../../services/main/main.service";
import {AdvocateWorkService} from "../../../../services/advocate/advocate-work.service";
import {
  AdvocateWorksInterface,
  AdvocateWorksInterfaceRequest
} from "../../../../models/advocates/advocate-works.interface";

@Component({
  selector: 'app-advocate-works-card',
  templateUrl: './advocate-works-card.component.html',
  styleUrls: ['./advocate-works-card.component.scss']
})
export class AdvocateWorksCardComponent {
  subClient$: Subscription = {} as Subscription;
  id: number|null = null;
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'date', name: 'Дата початку роботи'},
    {slug: 'name', name: 'Назва роботи'},
    {slug: 'what_done', name: 'Що зроблено'},
    {slug: 'result', name: 'Результат', type: 'result'}
  ];
  work: AdvocateWorksInterface = {} as AdvocateWorksInterface;


  constructor(private route: ActivatedRoute,
              private advocateWorksService: AdvocateWorkService,
              private mainService: MainService) {
  }

  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['advocate_work'];
          this.advocateWorksService.getOne(params['advocate_work']).subscribe((list: AdvocateWorksInterfaceRequest) => {
            this.work = list.data;
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }
  ngOnDestroy() {
    this.subClient$.unsubscribe();
  }
}
