import {Component, OnInit} from '@angular/core';
import {ClientsCardWorkListInterface} from "../../../../models/clients/clients-card.interface";
import {ClientsService} from "../../../../services/clients/clients.service";


@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent implements OnInit{
  list: ClientsCardWorkListInterface[] = [];
  tblColumns: Array<{name: string, slug: string}> = [
    {slug: 'visit_date', name: 'Дата звернення'},
    {slug: 'where_knows', name: 'Звідки дізнались'},
    {slug: 'full_name', name: 'П.І.Б.'},
    {slug: 'phone', name: 'Телефон'},
    {slug: 'visit_purpose', name: 'Причина звернення'},
    {slug: 'result', name: 'Результат'},
    {slug: 'fee', name: 'Гонорар'}
  ];

  constructor(private clientsService: ClientsService) {
  }
  ngOnInit(): void {
    this.list = this.clientsService.getList();
  }
}
