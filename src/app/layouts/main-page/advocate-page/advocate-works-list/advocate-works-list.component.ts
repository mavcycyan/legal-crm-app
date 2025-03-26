import { Component } from '@angular/core';
import {
  AdvocateWorksInterface,
  AdvocateWorksListInterfaceRequest
} from "../../../../models/advocates/advocate-works.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {MainService} from "../../../../services/main/main.service";
import {Subscription} from "rxjs";
import {AdvocateWorkService} from "../../../../services/advocate/advocate-work.service";

@Component({
  selector: 'app-advocate-works-list',
  templateUrl: './advocate-works-list.component.html',
  styleUrls: ['./advocate-works-list.component.scss']
})
export class AdvocateWorksListComponent {
  subAdvocate$: Subscription = {} as Subscription;
  works: AdvocateWorksInterface[] = [];
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'date', name: 'Дата початку роботи'},
    {slug: 'date_end', name: 'Дата завершення роботи'},
    {slug: 'name', name: 'Назва роботи'},
    {slug: 'workers_names', name: 'Виконавці'}
  ];
  id: number|null = null;

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  constructor(private route: ActivatedRoute,
              private advocateWorkService: AdvocateWorkService,
              private mainService: MainService) {
  }


  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          let params_client = {
            pag_size: this.pageSize
          };
          this.advocateWorkService.getList(params['case_id'], params_client).subscribe((data: AdvocateWorksListInterfaceRequest) => {
            this.id = params['case_id'];
            this.works = data.data;
            if (data.all_items !== undefined) {
              this.allItems = data.all_items;
            }
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }
  getList(event: {name: string, value: string} | null = null): void {
    if (this.id !== null) {
      this.mainService.setPreloaderState(true);
      if (event !== null) {
        if (event.name === 'pageOffset') {
          this.pageOffset = this.pageSize * (parseInt(event.value)-1);
        }
      }
      let params_client = {
        pag_size: this.pageSize
      };
      this.advocateWorkService.getList(this.id, params_client).subscribe((data: AdvocateWorksListInterfaceRequest) => {
        this.works = data.data;
        if (data.all_items !== undefined) {
          this.allItems = data.all_items;
        }
        this.mainService.setPreloaderState(false);
      });
    }
  }
}
