import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit{
  @Input() fields: any;
  @Input() formService: any;
  form: FormGroup = {} as FormGroup;
  isEdit: boolean = false;
  id: number|null = null;

  ngOnInit(): void {
    let newFields: any = {};
    this.fields.forEach((field: any) => {
      newFields[field.slug] = new FormControl('', Validators.required);
    });
    this.form = new FormGroup(newFields);
  }

  ngOnChanges() {
    let newFields: any = {};
    this.fields.forEach((field: any) => {
      newFields[field.slug] = new FormControl('', Validators.required);
    });
    this.form = new FormGroup(newFields);
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
