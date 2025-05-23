import { Component } from '@angular/core';
import {MainService} from "../../../services/main/main.service";
import {PagiBackService} from "../../../services/helper/pagi.back.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(private mainService: MainService,
              private pagiBackService: PagiBackService) {
    this.mainService.setEditBtnData({type: '', id: null});
    this.mainService.setEditBtnSecondaryData({type: '', id: null});
    this.pagiBackService.linksDry();
  }

}
