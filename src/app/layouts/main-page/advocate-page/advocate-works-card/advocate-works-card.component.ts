import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {MainService} from "../../../../services/main/main.service";
import {AdvocateWorkService} from "../../../../services/advocate/advocate-work.service";
import {
  AdvocateWorksInterface,
  AdvocateWorksInterfaceRequest
} from "../../../../models/advocates/advocate-works.interface";
import {AdvocateWorkFilesService} from "../../../../services/advocate/advocate-work-files.service";

@Component({
  selector: 'app-advocate-works-card',
  templateUrl: './advocate-works-card.component.html',
  styleUrls: ['./advocate-works-card.component.scss']
})
export class AdvocateWorksCardComponent {
  subClient$: Subscription = {} as Subscription;
  id: number|null = null;
  caseId: number|null = null;
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'date', name: 'Дата початку роботи'},
    {slug: 'date_end', name: 'Дата завершення роботи'},
    {slug: 'name', name: 'Назва роботи'},
    {slug: 'workers_names', name: 'Виконавець'},
    {slug: 'what_done', name: 'Що зроблено'},
    {slug: 'result', name: 'Результат', type: 'result'},
    {slug: 'files', name: 'Прикріплені файли', type: 'files'}
  ];
  work: AdvocateWorksInterface = {} as AdvocateWorksInterface;


  constructor(private route: ActivatedRoute,
              private advocateWorksService: AdvocateWorkService,
              public advocateWorkFilesService: AdvocateWorkFilesService,
              private mainService: MainService) {
  }

  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['advocate_work'];
          this.caseId = params['case_id'];
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
