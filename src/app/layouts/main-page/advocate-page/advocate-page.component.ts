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

  constructor(private advocateService: AdvocateService,
              private mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setEditBtnData({type: '', id: null});
    this.mainService.setEditBtnSecondaryData({type: '', id: null});
    this.advocateService.getList().subscribe((data: AdvocatesListInterfaceRequest) => {
      this.list = data.data
    });
  }
}
