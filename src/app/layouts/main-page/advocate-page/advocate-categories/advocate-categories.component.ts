import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdvocatesCardInterface} from "../../../../models/advocates/advocates-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";
import {
  AdvocateCategoriesInterface,
  AdvocateCategoriesInterfaceRequest
} from "../../../../models/advocates/advocate-categories.interface";
import {ClientsListInterface, ClientsListInterfaceRequest} from "../../../../models/clients/clients-list.interface";

@Component({
  selector: 'app-advocate-categories',
  templateUrl: './advocate-categories.component.html',
  styleUrls: ['./advocate-categories.component.scss']
})
export class AdvocateCategoriesComponent  implements OnInit, OnDestroy {
  categories: AdvocateCategoriesInterface[] = [];

  private categoriesSub$: Subscription = new Subscription();

  constructor(private advocateService: AdvocateService) {
  }

  ngOnInit(): void {
    this.categoriesSub$ = this.advocateService.getCategories().subscribe((categories: AdvocateCategoriesInterfaceRequest) => {
      this.categories = categories.data;
    });
  }
  ngOnDestroy(): void {
    this.categoriesSub$.unsubscribe();
  }
}
