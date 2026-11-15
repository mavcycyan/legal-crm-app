import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {FilesFormInterface, FilesFormInterfaceRequest} from "../../../models/forms/files-form.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {FilesFormServiceInterface} from "../../../models/services/form-services.interface";

@Component({
  selector: 'app-edit-form-files',
  templateUrl: './edit-form-files.component.html',
  styleUrls: ['./edit-form-files.component.scss']
})
export class EditFormFilesComponent implements OnInit, OnDestroy {

  @Input() id: number|null = null;
  @Input() service: FilesFormServiceInterface|null = null;
  @Output() modalState: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;

  pendingModal: boolean = false;
  filesList: FilesFormInterface[] = []
  subFiles$: Subscription = new Subscription()
  subSendFiles$: Subscription = new Subscription()
  subDelFiles$: Subscription = new Subscription()

  ngOnInit():void {
    if (this.id !== null && this.service !== null) {
      this.pendingModal = true;
      this.subFiles$ = this.service.getList(this.id).subscribe((files: FilesFormInterfaceRequest) => {
        this.filesList = files.data;
        this.pendingModal = false;
      })
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  submit(): void {
    if (!this.selectedFile) {
      alert('Будь ласка, виберіть файл');
      return;
    }
    if (this.id === null || this.service === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.pendingModal = true;
    this.subSendFiles$ = this.service.upload(this.id, formData).subscribe((files: FilesFormInterfaceRequest) => {
      if (files.success === true) {
        alert(files.message);
        this.filesList = files.data;
        this.fileInput.nativeElement.value = '';
        this.selectedFile = null;
      } else {
        alert('Помилка');
        console.error('Error:', files.message);
      }
      this.pendingModal = false;
    },
      (error: HttpErrorResponse) => {
        alert('Помилка');
        console.error('Error:', error);
        this.pendingModal = false;
      })
  }

  delete(id: number|undefined): void {
    if (id !== undefined && this.id !== null && this.service !== null) {
      this.pendingModal = true;
      this.subDelFiles$ = this.service.delete(id, this.id).subscribe((files: FilesFormInterfaceRequest) => {
          if (files.success === true) {
            alert(files.message);
            this.filesList = files.data;
          } else {
            alert('Помилка');
            console.error('Error:', files.message);
          }
          this.pendingModal = false;
        },
        (error: HttpErrorResponse) => {
          alert('Помилка');
          console.error('Error:', error);
          this.pendingModal = false;
        })
    }
  }

  ngOnDestroy():void {
    this.subFiles$.unsubscribe();
    this.subSendFiles$.unsubscribe();
    this.subDelFiles$.unsubscribe();
  }

}
