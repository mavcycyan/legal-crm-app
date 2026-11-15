import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {MainService} from "../../../services/main/main.service";
import {
  EditFormDataInterface,
  FormFieldsInterface,
  FormRepDataInterface
} from "../../../models/forms/form.fields.interface";
import {
  EditFormServiceInterface,
  FilesFormServiceInterface,
  PaymentsFormServiceInterface
} from "../../../models/services/form-services.interface";
import {
  ApiResponseInterface,
  ApiSaveResponseInterface,
  FormPayloadInterface
} from "../../../models/api/api-response.interface";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
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
export class EditFormComponent implements OnInit, OnChanges{
  @Input() fields: FormFieldsInterface[] = [];
  @Input() data: EditFormDataInterface = {};
  @Input() formService!: EditFormServiceInterface;
  @Input() formPaymentsService: PaymentsFormServiceInterface|null = null;
  @Input() formFilesService: FilesFormServiceInterface|null = null;
  @Input() isEdit: boolean = false;
  @Input() isInactive: boolean = false;
  @Input() type?: string = 'default';
  @Input() singleItemExtra?: Record<string, unknown>|null = null;
  @Input() parentId?: number|null = null;
  form: FormGroup = {} as FormGroup;
  id: number|null = null;
  paymodal: boolean = false;
  filemodal: boolean = false;
  passresmodal: boolean = false;

  configSelectDd = {
    displayKey:"description",
    search:true,
    height: 'auto',
    placeholder:'Обрати',
    limitTo: 0,
    moreText: '.',
    noResultsFound: 'Нічого не знайдено!',
    searchPlaceholder:'Пошук',
    searchOnKey: 'description',
    clearOnSelection: false,
    inputDirection: 'ltr',
    selectAllLabel: 'Обрати все',
    enableSelectAll: false,
  }

  constructor(private fb: FormBuilder,
              private mainService: MainService, private el: ElementRef) {
  }

  ngOnInit(): void {
    let newFields: Record<string, FormControl|FormArray> = {};
    this.fields.forEach((field: FormFieldsInterface) => {
      if (field.required) {
        newFields[field.slug] = new FormControl('', Validators.required);
      } else if (field.type === 'what_done') {
        newFields[field.slug] = this.fb.array([]);
      } else {
        newFields[field.slug] = new FormControl('');
      }
    });
    this.form = new FormGroup(newFields);
  }

  ngOnChanges() {
    if(this.isEdit) {
      this.mainService.setPreloaderState(true);
      const data = this.data as Record<string, unknown>;
      this.fields.forEach((item: FormFieldsInterface) => {
        const value = data[item.slug];
        if (item.type === 'what_done' && Array.isArray(value)) {
          const formArray = this.fb.array(
            value.map((obj: FormRepDataInterface) =>
              this.fb.group({
                data: [obj.data || '', Validators.required],
                pending: [obj.pending || false]
              })
            )
          );
          this.form.setControl(item.slug, formArray);
        } else {
          let forPatching: Record<string, unknown> = {};
          if (item.type === 'select_dd_multy') {
            if (Array.isArray(value)) {
              forPatching[item.slug] = value.map((el: unknown) =>
                item.choises_dd?.find((choise) => el == choise.id)
              );
            }
          } else {
            forPatching[item.slug] = value;
          }
          this.form.patchValue(forPatching);
        }
      });
      this.form.updateValueAndValidity();
      this.id = this.data.id ?? null;
      this.mainService.setPreloaderState(false);
    } else {
      if (this.singleItemExtra !== null && this.singleItemExtra !== undefined) {
        Object.keys(this.singleItemExtra).forEach((extra: string, i: number) => {
          this.fields.forEach((field: FormFieldsInterface) => {
            if (field.slug === extra && this.singleItemExtra !== null && this.singleItemExtra !== undefined) {
              let forPatching: Record<string, unknown> = {};
              forPatching[extra] = Object.values(this.singleItemExtra)[i];
              this.form.patchValue(forPatching);
            }
          });
        })
      }
    }
  }

  get whatDone(): FormArray {
    return (this.form.get('what_done') as FormArray) || this.fb.array([]);
  }
  addRepData(): void {
    const workListGroup = this.fb.group({
      data: ['', [Validators.required]],
      pending: [false],
    });
    this.whatDone.push(workListGroup);
  }
  removeRepData(id: number): void {
    this.whatDone.removeAt(id);
  }

  payModalOpen(): void {
    this.paymodal = true;
  }
  payModalClose(): void {
    this.paymodal = false;
  }
  payModalAction(state: boolean = false) {
    this.paymodal = state;
  }

  fileModalOpen(): void {
    this.filemodal = true;
  }
  fileModalClose(): void {
    this.filemodal = false;
  }
  fileModalAction(state: boolean = false) {
    this.filemodal = state;
  }

  passResModalOpen(): void {
    const id = this.id;
    this.passresmodal = true;
  }
  passResModalClose(): void {
    this.passresmodal = false;
  }
  passResModalAction(state: boolean = false) {
    this.passresmodal = state;
  }

  submit():void {
    console.log(this.form.value);
    if (this.form.status === 'VALID') {
      const valueObj: FormPayloadInterface = this.form.value;
      if(this.isEdit) {
        if (!this.formService.update || this.id === null) {
          return;
        }
        this.mainService.setPreloaderState(true);
        this.formService.update(this.id, valueObj).subscribe((response: ApiSaveResponseInterface) => {
          if (response.success !== undefined) {
            if (response.success == true) {
              if (response.data !== undefined && response.data.id !== undefined) {
                alert('Дані успішно оновлено');
                if (this.parentId !== null && this.parentId !== undefined) {
                  this.formService.redirectSuccess(response.data.id, this.parentId);
                } else {
                  this.formService.redirectSuccess(response.data.id);
                }
              }
            } else {
              alert('Помилка');
            }
          }
          console.log(response);
          this.mainService.setPreloaderState(false);
        })
      } else {
        this.mainService.setPreloaderState(true);
        this.formService.save(valueObj).subscribe((response: ApiSaveResponseInterface) => {
          if (response.success !== undefined) {
            if (response.success == true) {
              if (response.data !== undefined && response.data.id !== undefined) {
                alert('Дані успішно додано');
                if (this.parentId !== null && this.parentId !== undefined) {
                  this.formService.redirectSuccess(response.data.id, this.parentId);
                } else {
                  this.formService.redirectSuccess(response.data.id);
                }
              }
            } else {
              alert('Помилка');
            }
          }
          console.log(response);
          this.mainService.setPreloaderState(false);
        })
      }
    }
  }


  activate():void {
    if (!this.formService.activate || this.id === null) {
      return;
    }
    this.mainService.setPreloaderState(true);
    this.formService.activate(this.id).subscribe((response: ApiSaveResponseInterface) => {
      console.log(response);
      alert('Успішно відновлено');
      this.mainService.setPreloaderState(false);
        if (this.parentId !== null && this.parentId !== undefined) {
          this.formService.redirectSuccess(response.data.id, this.parentId);
        } else {
          this.formService.redirectSuccess(response.data.id);
        }
    },
      (error: unknown) => {
        alert(error);
        this.mainService.setPreloaderState(false);
      })
  }

  deactivate():void {
    if (!this.formService.deactivate || this.id === null) {
      return;
    }
    this.mainService.setPreloaderState(true);
    this.formService.deactivate(this.id).subscribe(() => {
      alert('Успішно відправлено в архів');
      this.mainService.setPreloaderState(false);
      this.formService.redirectRemoveSuccess?.();
    },
      (error: unknown) => {
        alert(error);
        this.mainService.setPreloaderState(false);
      })
  }


  delete():void {
    if (!this.formService.remove || this.id === null) {
      return;
    }
    this.mainService.setPreloaderState(true);
    this.formService.remove(this.id).subscribe((response: ApiResponseInterface) => {
      console.log(response);
      alert('Дані успішно видалено');
      this.mainService.setPreloaderState(false);
      this.formService.redirectRemoveSuccess?.();
    },
      (error: unknown) => {
        alert(error);
        this.mainService.setPreloaderState(false);
      })
  }

  protected readonly sessionStorage = sessionStorage;
}
