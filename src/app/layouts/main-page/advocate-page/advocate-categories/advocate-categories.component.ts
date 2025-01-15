import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdvocatesCardInterface} from "../../../../models/advocates/advocates-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";
import {
  AdvocateCategoriesInterface,
  AdvocateCategoriesInterfaceRequest
} from "../../../../models/advocates/advocate-categories.interface";
import {MainService} from "../../../../services/main/main.service";

@Component({
  selector: 'app-advocate-categories',
  templateUrl: './advocate-categories.component.html',
  styleUrls: ['./advocate-categories.component.scss']
})
export class AdvocateCategoriesComponent  implements OnInit, OnDestroy {
  categories: AdvocateCategoriesInterface[] = [];

  private categoriesSub$: Subscription = new Subscription();

  constructor(private advocateService: AdvocateService,
              private mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setEditBtnData({type: 'advocate_category', id: null});
    this.mainService.setEditBtnSecondaryData({type: '', id: null});
    this.categoriesSub$ = this.advocateService.getCategories().subscribe((categories: AdvocateCategoriesInterfaceRequest) => {
      this.categories = categories.data;
    });
  }
  ngOnDestroy(): void {
    this.categoriesSub$.unsubscribe();
  }
}
