import { Component } from '@angular/core';
import {List} from "../main-page.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
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
}
