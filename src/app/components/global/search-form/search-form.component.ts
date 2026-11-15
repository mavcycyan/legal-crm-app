import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PageEventInterface} from "../../../models/api/api-response.interface";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {

  @Input() field: string = '';
  @Input() placeholder: string = '';
  @Output() updatePage: EventEmitter<PageEventInterface> = new EventEmitter<PageEventInterface>();
  @ViewChild('searchForm') searchForm!: ElementRef;


  refreshData(num: string) {
    this.updatePage.emit({name: `srch_${this.field}`, value: num});
  }
  resetData() {
    this.searchForm.nativeElement.value = '';
    this.updatePage.emit({name: `srch_${this.field}`, value: ''});
  }
}
