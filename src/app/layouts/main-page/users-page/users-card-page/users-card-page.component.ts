import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserInterface, UserInterfaceRequest} from "../../../../models/auth/user.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../../services/auth/user.service";
import {MainService} from "../../../../services/main/main.service";

@Component({
  selector: 'app-users-card-page',
  templateUrl: './users-card-page.component.html',
  styleUrls: ['./users-card-page.component.scss']
})
export class UsersCardPageComponent implements OnInit, OnDestroy {
  subUser$: Subscription = {} as Subscription;

  user: UserInterface = {} as UserInterface;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private mainService: MainService) {
  }


  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.subUser$ = this.route.params
      .subscribe(
        (params: Params) => {
          this.userService.getOne(params['id']).subscribe((user: UserInterfaceRequest) => {
            this.mainService.setEditBtnData({type: 'user', id: params['id']});
            this.mainService.setEditBtnSecondaryData({type: '', id: null});
            this.user = user.data;
            this.mainService.setPreloaderState(false);
          });
        }
      )
  }


  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
  }
}
