import {Component, OnInit} from '@angular/core';
import {AdvocatesListInterface} from "../../../models/advocates/advocates-list.interface";
import {AdvocateService} from "../../../services/advocate/advocate.service";

@Component({
  selector: 'app-advocate-page',
  templateUrl: './advocate-page.component.html',
  styleUrls: ['./advocate-page.component.scss']
})
export class AdvocatePageComponent implements OnInit{
  list: AdvocatesListInterface[] = [];

  constructor(private advocateService: AdvocateService) {
  }

  ngOnInit(): void {
    this.list = this.advocateService.getList();
  }
}
