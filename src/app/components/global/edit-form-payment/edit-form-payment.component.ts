import {Component, Input, OnInit} from '@angular/core';
import {ClientWorkPaymentsService} from "../../../services/clients/client-work-payments.service";
import {
  PaymentFormInterface,
  PaymentFormInterfaceRequest,
  PaymentFormPayInterface
} from "../../../models/forms/payment-form.interface";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-form-payment',
  templateUrl: './edit-form-payment.component.html',
  styleUrls: ['./edit-form-payment.component.scss']
})
export class EditFormPaymentComponent implements OnInit{

  @Input() id: number|null = null;
  @Input() service: any;
  @Input() type?: string = 'default';

  priceList: PaymentFormInterface[] = [];
  form: FormGroup = {} as FormGroup;
  pendingModal: boolean = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      prices: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.pendingModal = true;
      this.service.getList(this.id).subscribe((data:PaymentFormInterfaceRequest) => {
        this.priceList = data.data;

        let prices = this.fb.array(this.priceList.map((price: PaymentFormInterface) => {
          let dlArray: any = this.fb.array([]);
          if (this.type === 'modified') {
            if (price.deadlines && price.deadlines.length > 0) {
              dlArray = this.fb.array(
                price.deadlines.map((obj: any) =>
                  this.fb.group({
                    date: [obj.date || ''],
                    fee: [obj.fee || '']
                  })
                )
              );
            }
          }
          if (price.payments && price.payments.length > 0) {
            let controls: {
              id: any,
              price: any,
              name?: any,
              deadlines?: any,
              payments: any
            } = {
              id: [price.id, Validators.required],
              price: [price.price, [Validators.required]],
              payments: this.fb.array(price.payments.map((payment: PaymentFormPayInterface) => {
                return this.fb.group({
                  id: [payment.id, Validators.required],
                  amount: [payment.amount, [Validators.required]],
                  date: [payment.date]
                })
              }))
            };
            if (this.type === 'modified') {
              controls.name = [price.name];
              controls.deadlines = dlArray;
            }
            return this.fb.group(controls)
          } else {
            let controls: {
              id: any,
                price: any,
                name?: any,
                deadlines?: any,
                payments: any
            } = {
              id: [price.id, Validators.required],
              price: [price.price, [Validators.required]],
              payments: this.fb.array([])
            };
            if (this.type === 'modified') {
              controls.name = [price.name];
              controls.deadlines = dlArray;
            }
            return this.fb.group(controls)
          }
        }))
        this.form.setControl('prices', prices);
        this.pendingModal = false;
      })
    }
  }

  get prices(): FormArray {
    return this.form.get('prices') as FormArray;
  }

  getPayments(priceIndex: number): FormArray {
    return this.prices.at(priceIndex).get('payments') as FormArray;
  }

  addPrice() {
    let controls: {
      id: any,
      price: any,
      name?: any,
      deadlines?: any,
      payments: any
    } = {
      id: [null],
      price: [null, [Validators.required, Validators.min(1)]],
      payments: this.fb.array([])
    };
    if (this.type === 'modified') {
      controls.name = [null];
      controls.deadlines = this.fb.array([]);
    }
    this.prices.push(this.fb.group(controls));
  }

  removePrice(index: number) {
    this.prices.removeAt(index);
  }

  addPayment(priceIndex: number) {
    const date = (this.type === 'modified') ? new Date().toISOString().slice(0, 16) : new Date().toISOString().split('T')[0];
    this.getPayments(priceIndex).push(this.fb.group({
      id: [null],
      amount: [null, [Validators.required, Validators.min(1)]],
      date: [date]
    }));
  }

  removePayment(priceIndex: number, paymentIndex: number) {
    this.getPayments(priceIndex).removeAt(paymentIndex);
  }


  getDeadlines(priceIndex: number): FormArray {
    return this.prices.at(priceIndex).get('deadlines') as FormArray;
  }

  addDeadline(priceIndex: number) {
    this.getDeadlines(priceIndex).push(this.fb.group({
      fee: [null, [Validators.required, Validators.min(1)]],
      date: [null]
    }));
  }

  removeDeadline(priceIndex: number, deadlineIndex: number) {
    this.getDeadlines(priceIndex).removeAt(deadlineIndex);
  }

  submit():void {
    if (this.form.status === 'VALID') {
      const valueObj: any = this.form.value;
      valueObj.parent_id = this.id;
      this.service.update(valueObj).subscribe((data: PaymentFormInterfaceRequest) => {
        console.log(data);
      });
    }
  }
}
