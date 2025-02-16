import {Component, OnInit} from '@angular/core';
import {
  AdvocatesListInterface,
  AdvocatesListInterfaceRequest
} from "../../../models/advocates/advocates-list.interface";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {MainService} from "../../../services/main/main.service";

@Component({
  selector: 'app-advocate-page',
  templateUrl: './advocate-page.component.html',
  styleUrls: ['./advocate-page.component.scss']
})
export class AdvocatePageComponent implements OnInit{
  list: AdvocatesListInterface[] = [];
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'name', name: 'П.І.Б.'},
    {slug: 'email', name: 'E-mail'}
  ];

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  constructor(private advocateService: AdvocateService,
              private mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.advocateService.getList({pag_size: this.pageSize}).subscribe((data: AdvocatesListInterfaceRequest) => {
      this.list = data.data
      if (data.all_items !== undefined) {
        this.allItems = data.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }

  getList(event: number | null = null): void {
    this.mainService.setPreloaderState(true);
    this.pageOffset = (event !== null) ? this.pageSize * (event-1) : 0;
    this.advocateService.getList({pag_size: this.pageSize, pag_offset: this.pageOffset}).subscribe((data: AdvocatesListInterfaceRequest) => {
      this.list = data.data
      if (data.all_items !== undefined) {
        this.allItems = data.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }
}
