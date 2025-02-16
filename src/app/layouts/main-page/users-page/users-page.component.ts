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

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  constructor(private usersService: UserService,
              private mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    this.usersService.getList({pag_size: this.pageSize}).subscribe((data: UsersInterfaceRequest) => {
      this.list = data.data
      if (data.all_items !== undefined) {
        this.allItems = data.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }

  getList(event: number | null = null): void {
    this.mainService.setPreloaderState(true);
    this.pageOffset = (event !== null) ? this.pageSize * (event-1) : 0;
    this.usersService.getList({pag_size: this.pageSize, pag_offset: this.pageOffset}).subscribe((data: UsersInterfaceRequest) => {
      this.list = data.data
      if (data.all_items !== undefined) {
        this.allItems = data.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }

}
