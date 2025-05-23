import {Component, OnInit} from '@angular/core';
import {
  AdvocatesListInterface,
  AdvocatesListInterfaceRequest
} from "../../../models/advocates/advocates-list.interface";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {MainService} from "../../../services/main/main.service";
import {PagiBackService} from "../../../services/helper/pagi.back.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-advocate-page',
  templateUrl: './advocate-page.component.html',
  styleUrls: ['./advocate-page.component.scss']
})
export class AdvocatePageComponent implements OnInit{
  list: AdvocatesListInterface[] = [];
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'name', name: 'П.І.Б.'}
  ];

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  // sorting
  sortDirection: string = 'asc';
  sortBy: string = 'name';

  constructor(private advocateService: AdvocateService,
              private mainService: MainService,
              private pagiBackService: PagiBackService) {
  }

  ngOnInit(): void {
    this.pagiBackService.linksDry();
    this.mainService.setPreloaderState(true);
    let params = {
      pag_size: this.pageSize,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy
    };
    this.advocateService.getList(params).subscribe((data: AdvocatesListInterfaceRequest) => {
      this.list = data.data
      if (data.all_items !== undefined) {
        this.allItems = data.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }

  getList(event: {name: string, value: string} | null = null): void {
    this.mainService.setPreloaderState(true);
    if (event !== null) {
      if (event.name === 'pageOffset') {
        this.pageOffset = this.pageSize * (parseInt(event.value)-1);
      }
    }
    let params = {
      pag_size: this.pageSize,
      pag_offset: this.pageOffset,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy
    };
    this.advocateService.getList(params).subscribe((data: AdvocatesListInterfaceRequest) => {
      this.list = data.data
      if (data.all_items !== undefined) {
        this.allItems = data.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
}
