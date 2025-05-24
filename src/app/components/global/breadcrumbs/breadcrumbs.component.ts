import {Component, Input, OnInit} from '@angular/core';
import {PagiBackService} from "../../../services/helper/pagi.back.service";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  crumbs: Record<string, {link: string, queryParams: Record<string, any>}> = {}
  @Input() maxCrumb?: number;
  constructor(private pagiBackService: PagiBackService) {
  }

  ngOnInit(): void {
    let sessionCrumbs: Record<string, string> = this.pagiBackService.linksGet();
    Object.keys(sessionCrumbs).forEach((item: string, i: number) => {
      let link = '';
      let queryParams: Record<string, any> = {};
      let objVal = Object.values(sessionCrumbs)[i];
      if (objVal.indexOf('?') !== -1) {
        let objValArr = objVal.split('?');
        link = objValArr[0];
        queryParams[objValArr[1].split('=')[0]] = objValArr[1].split('=')[1];
      } else {
        link = objVal;
      }
      this.crumbs[item] = {
        link,
        queryParams
      }
    });
  }
}
