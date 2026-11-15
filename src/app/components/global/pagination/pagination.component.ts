import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PageEventInterface} from "../../../models/api/api-response.interface";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges{
  page = 1;
  @Input() pageSize: number = 10;
  @Input() allItems: number = 0;
  @Input() startPage?: number = 0;
  @Output() updatePage: EventEmitter<PageEventInterface> = new EventEmitter<PageEventInterface>();
  pages: number = 0;

  ngOnInit() {
    if (this.startPage !== undefined && this.startPage !== null && this.startPage > 1) {
      this.page = this.startPage;
    }
    this.pages = Math.ceil(this.allItems / this.pageSize);
  }

  ngOnChanges() {
    this.pages = Math.ceil(this.allItems / this.pageSize);
  }

  refreshData(num: number) {
    this.page = num;
    this.updatePage.emit({name: 'pageOffset', value: String(this.page)});
  }

  protected readonly Array = Array;
}
