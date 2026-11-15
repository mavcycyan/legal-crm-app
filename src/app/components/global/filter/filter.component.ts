import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {PageEventInterface} from "../../../models/api/api-response.interface";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('slideRight', [
      transition(':enter', [
        style({ right: '-350px' }),
        animate('300ms ease-out', style({ right: '0px' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ right: '-350px' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FilterComponent {
  @Input() sort: {name: string, value: string}[] = [];
  @Input() filter: {name: string, value: string}[] = [];
  @Output() updatePage: EventEmitter<PageEventInterface> = new EventEmitter<PageEventInterface>();
  modal: boolean = false;

  refreshData(name: string = '', value: string = '') {
    this.updatePage.emit({name, value});
  }

  filterModalOpen(): void {
    this.modal = true;
  }
  filterModalClose(): void {
    this.modal = false;
  }
}
