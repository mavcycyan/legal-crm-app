import {Component, OnInit} from '@angular/core';
import {ClientsListInterface, ClientsListWorkInterface} from "../../../../models/clients/clients-list.interface";
import {ClientsCardInterface} from "../../../../models/clients/clients-card.interface";
import {ClientsService} from "../../../../services/clients/clients.service";


@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent implements OnInit{
  list: ClientsListWorkInterface[] = [];

  constructor(private clientsService: ClientsService) {
  }
  ngOnInit(): void {
    this.list = this.clientsService.getList();
  }
}
