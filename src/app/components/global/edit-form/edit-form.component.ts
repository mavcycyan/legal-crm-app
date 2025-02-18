import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {MainService} from "../../../services/main/main.service";

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
  @Input() fields: any;
  @Input() data: any;
  @Input() formService: any;
  @Input() formPaymentsService: any;
  @Input() isEdit: boolean = false;
  form: FormGroup = {} as FormGroup;
  id: number|null = null;
  paymodal: boolean = false;

  constructor(private fb: FormBuilder,
              private mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.setEditBtnData({type: '', id: null});
    this.mainService.setEditBtnSecondaryData({type: '', id: null});
    let newFields: any = {};
    this.fields.forEach((field: any) => {
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
      this.fields.forEach((item: any) => {
        if (item.type === 'what_done' && this.data[item.slug]) {
          const formArray = this.fb.array(
            this.data[item.slug].map((obj: any) =>
              this.fb.group({
                data: [obj.data || '', Validators.required],
                pending: [obj.pending || false]
              })
            )
          );
          this.form.setControl(item.slug, formArray);
        } else {
          let forPatching: any = {};
          forPatching[item.slug] = this.data[item.slug];
          this.form.patchValue(forPatching);
        }
      });
      this.form.updateValueAndValidity();
      this.id = this.data.id;
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
    const id = this.id;
    this.paymodal = true;
  }
  payModalClose(): void {
    this.paymodal = false;
  }

  submit():void {
    if (this.form.status === 'VALID') {
      const valueObj: any = this.form.value;
      if(this.isEdit) {
        this.formService.update(this.id, valueObj).subscribe((response: any) => {
          if (response.success !== undefined) {
            if (response.success == true) {
              if (response.data !== undefined && response.data.id !== undefined) {
                this.formService.redirectSuccess(response.data.id);
              }
            } else {
              alert('Помилка');
            }
          }
          console.log(response);
        })
      } else {
        this.formService.save(valueObj).subscribe((response: any) => {
          if (response.success !== undefined) {
            if (response.success == true) {
              if (response.data !== undefined && response.data.id !== undefined) {
                this.formService.redirectSuccess(response.data.id);
              }
            } else {
              alert('Помилка');
            }
          }
          console.log(response);
        })
      }
    }
  }


  delete():void {
    this.formService.remove(this.id).subscribe((response: any) => {
      console.log(response);
    })
  }
}
