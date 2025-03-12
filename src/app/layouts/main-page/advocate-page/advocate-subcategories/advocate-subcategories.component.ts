import {Component, Input} from '@angular/core';
import {
  AdvocateCategoriesInterface,
  AdvocateCategoriesInterfaceRequest
} from "../../../../models/advocates/advocate-categories.interface";
import {Subscription} from "rxjs";
import {AdvocateService} from "../../../../services/advocate/advocate.service";
import {MainService} from "../../../../services/main/main.service";

@Component({
  selector: 'app-advocate-subcategories',
  templateUrl: './advocate-subcategories.component.html',
  styleUrls: ['./advocate-subcategories.component.scss']
})
export class AdvocateSubcategoriesComponent {
  @Input() id: number|null = null;
  @Input() advocateId: number|null = null;
  @Input() categories: AdvocateCategoriesInterface[] = [];

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
