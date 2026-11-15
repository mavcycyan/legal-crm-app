import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FilesFormInterface, FilesFormInterfaceRequest} from "../../../models/forms/files-form.interface";
import {Subscription} from "rxjs";
import {FilesFormServiceInterface} from "../../../models/services/form-services.interface";

@Component({
  selector: 'app-table-card-files',
  templateUrl: './table-card-files.component.html',
  styleUrls: ['./table-card-files.component.scss']
})
export class TableCardFilesComponent implements OnInit, OnDestroy {

  @Input() id: number|null = null;
  @Input() service: FilesFormServiceInterface|null = null;

  pendingModal: boolean = false;
  filesList: FilesFormInterface[] = []
  subFiles$: Subscription = new Subscription()

  ngOnInit():void {
    if (this.id !== null && this.service !== null) {
      this.pendingModal = true;
      this.subFiles$ = this.service.getList(this.id).subscribe((files: FilesFormInterfaceRequest) => {
        this.filesList = files.data;
        this.pendingModal = false;
      })
    }
  }

  ngOnDestroy():void {
    this.subFiles$.unsubscribe();
  }
}
