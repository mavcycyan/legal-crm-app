import {Component, Input, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {TablePaymentService} from "../../../services/table/table-payment.service";
import {TablePaymentInterface, TablePaymentInterfaceRequest} from "../../../models/table/table-payment.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
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
export class TableComponent {
  @Input() columns: Array<{name: string, slug: string, type?: string}> = [];
  @Input() data: any = [];
  @Input() tableClass: string = '';
  @Input() tablePaymentService: any = null;

  subMdl$: Subscription = new Subscription();
  paymodal: boolean = false;
  payModalList: TablePaymentInterface[] = [];
  advcaseClient: boolean = false;
  pendingModal: boolean = false;

  payModalOpen(id: number|null = null) {
    if (id !== null && this.tablePaymentService !== null && this.tablePaymentService !== undefined) {
      this.pendingModal = true;
      this.paymodal = true;
      this.subMdl$ = this.tablePaymentService.getList(id).subscribe((list: TablePaymentInterfaceRequest) => {
        this.payModalList = list.data;
        this.pendingModal = false;
      })
    }
  }
  payModalClose(): void {
    this.paymodal = false;
    this.subMdl$.unsubscribe();
  }

  advcaseClientOpen(id: number|null = null) {
    if (id !== null) {
      this.advcaseClient = true;
    }
  }
  advcaseClientClose(): void {
    this.advcaseClient = false;
    this.subMdl$.unsubscribe();
  }
}
