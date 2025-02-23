import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MainService} from "../../../../../services/main/main.service";
import {Subscription} from "rxjs";
import {
  ClientCardWorksListInterface,
  ClientCardWorksListInterfaceRequest
} from "../../../../../models/clients/client-card-works-list.interface";
import {ClientWorksService} from "../../../../../services/clients/client-works.service";

@Component({
  selector: 'app-client-works-list',
  templateUrl: './client-works-list.component.html',
  styleUrls: ['./client-works-list.component.scss']
})
export class ClientWorksListComponent implements OnInit, OnDestroy {
  subClient$: Subscription = {} as Subscription;
  id: number|null = null;
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'visit_date', name: 'Дата звернення'},
    {slug: 'visit_purpose', name: 'Причина звернення'},
    {slug: 'result', name: 'Результат', type: 'result'},
    {slug: 'fee', name: 'Гонорар'}
  ];
  works: ClientCardWorksListInterface[] = [];

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;


  constructor(private route: ActivatedRoute,
              private clientWorksService: ClientWorksService,
              private mainService: MainService) {
  }

  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.subClient$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          let params_client = {
            pag_size: this.pageSize
          };
          this.clientWorksService.getList(params['id'], params_client).subscribe((list: ClientCardWorksListInterfaceRequest) => {
            this.works = list.data.map((item: ClientCardWorksListInterface) => ({
              ...item,
              edit_path: `/edit/lawyer/client_work/${item.id}`
            }));
            if (list.all_items !== undefined) {
              this.allItems = list.all_items;
            }
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }
  ngOnDestroy() {
    this.subClient$.unsubscribe();
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
        pag_size: this.pageSize,
        pag_offset: this.pageOffset,
      };
      this.clientWorksService.getList(this.id, params_client).subscribe((list: ClientCardWorksListInterfaceRequest) => {
        this.works = list.data.map((item: ClientCardWorksListInterface) => ({
          ...item,
          edit_path: `/edit/lawyer/client_work/${item.id}`
        }));
        if (list.all_items !== undefined) {
          this.allItems = list.all_items;
        }
        this.mainService.setPreloaderState(false);
      });
    }
  }
}
