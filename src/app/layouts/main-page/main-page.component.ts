import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

export interface List {
  type: String,
  responsible: String,
  title: String,
  dateStart: String,
  dateEnd: String
}
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})


export class MainPageComponent implements OnInit{
  login: String = '';
  list: Array<List> = [
    {type: 'А', responsible: 'Адвокатенко Петро Петрович', title: 'Назва справи...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
    {type: 'Ю', responsible: 'Захистенко Олег Олегович', title: 'Назва справи 2...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
    {type: 'Ю', responsible: 'Клієнтенко Ольга Іванівна', title: 'Назва справи 3...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
    {type: 'Ю', responsible: 'Захистенко Олег Олегович', title: 'Назва справи 4...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
    {type: 'А', responsible: 'Тестенко Андрій Андрійович', title: 'Назва справи 5...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
    {type: 'А', responsible: 'Літак Віолета Казимирівна', title: 'Назва справи 6...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
    {type: 'Ю', responsible: 'Прикладенко Сергій Сергійович', title: 'Назва справи 7...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
    {type: 'А', responsible: 'Клієнтенко Ольга Іванівна', title: 'Назва справи 8...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
    {type: 'А', responsible: 'Абоненко Денис Денисович', title: 'Назва справи 9...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
    {type: 'А', responsible: 'Адвокатенко Петро Петрович', title: 'Назва справи 10...', dateStart: '2024-02-20', dateEnd: '2024-07-02'},
  ];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.login = this.authService.getLogin();
  }
}
