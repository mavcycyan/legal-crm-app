import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit{
  @Input() fields: any;
  @Input() data: any;
  @Input() formService: any;
  form: FormGroup = {} as FormGroup;
  isEdit: boolean = false;
  id: number|null = null;

  constructor(private fb: FormBuilder) {
    this.fields.forEach((field: any) => {
      if (field.type === 'repeater') {
        let control: any;
        const slug = field.slug;
        control[slug] = this.fb.array([]);
        this.form = this.fb.group(control);
      }
    });
  }

  ngOnInit(): void {
    let newFields: any = {};
    this.fields.forEach((field: any) => {
      if (field.required) {
        newFields[field.slug] = new FormControl('', Validators.required);
      } else {
        newFields[field.slug] = new FormControl('');
      }
    });
    this.form = new FormGroup(newFields);
  }

  ngOnChanges() {
    let newFields: any = {};
    this.fields.forEach((field: any) => {
      if (field.required) {
        newFields[field.slug] = new FormControl('', Validators.required);
      } else {
        newFields[field.slug] = new FormControl('');
      }
    });
    this.form = new FormGroup(newFields);
  }

  get todos(): FormArray {
    return this.form.get('todos') as FormArray;
  }
  addRepData(): void {
    const todoGroup = this.fb.group({
      data: ['', [Validators.required]], // Поле тексту
      pending: [false], // Поле select
    });
    this.todos.push(todoGroup);
  }
  removeRepData(id: number): void {
    this.todos.removeAt(id);
  }

  submit():void {
    if (this.form.status === 'VALID') {
      const valueObj: any = this.form.value;
      this.formService.save(valueObj).subscribe((response: any) => {
        console.log(response);
      })
    }
  }


  delete():void {
    this.formService.delete(this.id).subscribe((response: any) => {
      console.log(response);
    })
  }
}
