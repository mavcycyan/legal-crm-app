import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges{
  page = 1;
  @Input() pageSize: number = 10;
  @Input() allItems: number = 0;
  @Output() updatePage: EventEmitter<any> = new EventEmitter();
  pages: number = 0;

  ngOnInit() {
    this.pages = Math.ceil(this.allItems / this.pageSize);
  }

  ngOnChanges() {
    this.pages = Math.ceil(this.allItems / this.pageSize);
  }

  refreshData(num: number) {
    this.page = num;
    this.updatePage.emit({name: 'pageOffset', value: this.page});
  }

  protected readonly Array = Array;
}
