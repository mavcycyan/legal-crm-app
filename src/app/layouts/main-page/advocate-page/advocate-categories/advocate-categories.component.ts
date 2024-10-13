import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdvocatesCardInterface} from "../../../../models/advocates/advocates-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";
import {AdvocateCategoriesInterface} from "../../../../models/advocates/advocate-categories.interface";

@Component({
  selector: 'app-advocate-categories',
  templateUrl: './advocate-categories.component.html',
  styleUrls: ['./advocate-categories.component.scss']
})
export class AdvocateCategoriesComponent  implements OnInit {
  categories: AdvocateCategoriesInterface[] = [];

  constructor(private advocateService: AdvocateService) {
  }


  ngOnInit(): void {
    this.categories = this.advocateService.getCategories();
  }
}
