import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit, OnChanges{
  @Input() fields: any;
  @Input() data: any;
  @Input() formService: any;
  @Input() isEdit: boolean = false;
  form: FormGroup = {} as FormGroup;
  id: number|null = null;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let newFields: any = {};
    this.fields.forEach((field: any) => {
      if (field.required) {
        newFields[field.slug] = new FormControl('', Validators.required);
      } else if (field.type === 'what_done') {
        newFields[field.slug] = this.fb.array([]);
      } else if (field.type === 'checkbox') {
        newFields[field.slug] = this.fb.array([]);
      } else {
        newFields[field.slug] = new FormControl('');
      }
    });
    this.form = new FormGroup(newFields);
  }

  ngOnChanges() {
    this.fields.forEach((field: any) => {
      if (field.type === 'checkbox') {
        const checkboxes = field.choises.map((choise: {label: string, value: string}) => new FormControl(false));
        this.form.setControl(field.slug, this.fb.array(checkboxes));
      }
    });
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
        } else if (item.type === 'checkbox' && this.data[item.slug]) {
          // const formArray = this.fb.array(
          //   this.data[item.slug].map((obj: any) =>
          //     this.fb.group(obj)
          //   )
          // );
          // this.form.setControl(item.slug, formArray);
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

  submit():void {
    console.log(this.form.controls);
    console.log(this.form.value);
    return
    if (this.form.status === 'VALID') {
      const valueObj: any = this.form.value;
      if(this.isEdit) {
        this.formService.update(this.id, valueObj).subscribe((response: any) => {
          console.log(response);
        })
      } else {
        this.formService.save(valueObj).subscribe((response: any) => {
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
