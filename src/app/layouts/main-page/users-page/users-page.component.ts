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
  tblColumns: Array<{name: string, slug: string, type?: string}> = [
    {slug: 'name', name: 'П.І.Б.'},
    {slug: 'email', name: 'E-mail'},
    {slug: 'role_id', name: 'Роль', type: 'role_id'}
  ];

  //pagination
  allItems: number = 0;
  pageSize: number = 10;
  pageOffset: number = 0;

  // sorting
  sortDirection: string = 'asc';
  sortBy: string = 'name';

  constructor(private usersService: UserService,
              private mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setPreloaderState(true);
    let params = {
      pag_size: this.pageSize,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy
    };
    this.usersService.getList(params).subscribe((data: UsersInterfaceRequest) => {
      this.list = data.data
      if (data.all_items !== undefined) {
        this.allItems = data.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }

  getList(event: {name: string, value: string} | null = null): void {
    this.mainService.setPreloaderState(true);
    if (event !== null) {
      if (event.name === 'pageOffset') {
        this.pageOffset = this.pageSize * (parseInt(event.value)-1);
      }
    }
    let params = {
      pag_size: this.pageSize,
      pag_offset: this.pageOffset,
      sort_dir: this.sortDirection,
      sort_field: this.sortBy
    };
    this.usersService.getList(params).subscribe((data: UsersInterfaceRequest) => {
      this.list = data.data
      if (data.all_items !== undefined) {
        this.allItems = data.all_items;
      }
      this.mainService.setPreloaderState(false);
    });
  }

}
