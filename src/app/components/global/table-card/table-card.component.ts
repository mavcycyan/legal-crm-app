import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
  animations: [
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
export class TableCardComponent {
  @Input() columns: Array<{name: string, slug: string, type?: string}> = [];
  @Input() data: any = [];
  @Input() hasMore: boolean = false;
  @Input() filesService: any;
  @Input() id: number|null = null;

  filemodal: boolean = false;

  fileModalOpen(): void {
    this.filemodal = true;
  }
  fileModalClose(): void {
    this.filemodal = false;
  }

}
