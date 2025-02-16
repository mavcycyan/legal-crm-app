import {Component, OnInit} from '@angular/core';
import {UserInterface, UsersInterfaceRequest} from "../../../models/auth/user.interface";
import {UserService} from "../../../services/auth/user.service";
import {MainService} from "../../../services/main/main.service";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  list: UserInterface[] = []
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'name', name: 'П.І.Б.'},
    {slug: 'email', name: 'E-mail'},
    {slug: 'role_id', name: 'Роль'}
  ];

  constructor(private usersService: UserService,
              private mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.usersService.getList().subscribe((data: UsersInterfaceRequest) => {
      this.list = data.data
      this.mainService.setPreloaderState(false);
    });
  }

}
