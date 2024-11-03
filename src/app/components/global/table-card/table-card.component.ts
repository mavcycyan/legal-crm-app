import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss']
})
export class TableCardComponent {
  @Input() columns: Array<{name: string, slug: string}> = [];
  @Input() data: any = [];
  @Input() hasMore: boolean = false;

}
