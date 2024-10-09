import {Component, OnInit} from '@angular/core';
import {SubscribersListInterface} from "../../../../models/subscribers/subscribers-list.interface";
import {SubscribersService} from "../../../../services/subscribers/subscribers.service";

@Component({
  selector: 'app-subscribers-page',
  templateUrl: './subscribers-page.component.html',
  styleUrls: ['./subscribers-page.component.scss']
})
export class SubscribersPageComponent implements OnInit{
  list: SubscribersListInterface[] = []

  constructor(private subscribersService: SubscribersService) {
  }
  ngOnInit() {
    this.list = this.subscribersService.getList();
  }
}
