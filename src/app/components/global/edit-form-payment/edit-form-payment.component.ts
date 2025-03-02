import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  PaymentFormInterface,
  PaymentFormInterfaceRequest,
  PaymentFormPayInterface
} from "../../../models/forms/payment-form.interface";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-form-payment',
  templateUrl: './edit-form-payment.component.html',
  styleUrls: ['./edit-form-payment.component.scss']
})
export class EditFormPaymentComponent implements OnInit{

  @Input() id: number|null = null;
  @Input() service: any;
  @Input() type?: string = 'default';
  @Output() modalState: EventEmitter<boolean> = new EventEmitter<boolean>();

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
              date: any,
              date_end: any,
              status: any,
              name?: any,
              deadlines?: any,
              payments: any
            } = {
              id: [price.id, Validators.required],
              price: [price.price, [Validators.required]],
              date: [price.date],
              date_end: [price.date_end],
              status: [price.status],
              payments: this.fb.array(price.payments.map((payment: PaymentFormPayInterface) => {
                let controls: {
                  id: any,
                  amount: any,
                  amount_currency?: any,
                  amount_currency_val?: any,
                  date: any
                } = {
                  id: [payment.id, Validators.required],
                  amount: [payment.amount, [Validators.required]],
                  date: [payment.date]
                };
                if (this.type === 'modified') {
                  const amount_currency: {value: string, disabled: boolean} = {value: '', disabled: false};
                  let amount_currency_val: string = '';
                  if (payment.amount_currency !== undefined && payment.amount_currency !== '') {
                    if (payment.amount_currency !== '' && payment.amount_currency !== null) {
                      const vals = payment.amount_currency.split(' ');
                      amount_currency.value = vals[0];
                      amount_currency.disabled = false;
                      amount_currency_val = (vals.length > 1) ? vals[1] : '';
                      controls.amount = [{value: payment.amount, disabled: false}, [Validators.required]];
                    }
                  }
                  controls.amount_currency = [amount_currency];
                  controls.amount_currency_val = [amount_currency_val];
                }
                return this.fb.group(controls)
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
                date: any,
                date_end: any,
                status: any,
                name?: any,
                deadlines?: any,
                payments: any
            } = {
              id: [price.id, Validators.required],
              price: [price.price, [Validators.required]],
              date: [price.date],
              date_end: [price.date_end],
              status: [price.status],
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
      date: any,
      date_end: any,
      name?: any,
      deadlines?: any,
      payments: any
    } = {
      id: [null],
      price: [null, [Validators.required, Validators.min(1)]],
      date: [null],
      date_end: [null],
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
    let controls: {
      id: any,
      amount: any,
      amount_currency?: any,
      amount_currency_val?: any,
      date: any
    } = {
      id: [null],
      amount: [null, [Validators.required, Validators.min(1)]],
      date: [date]
    };
    if (this.type === 'modified') {
      controls.amount_currency = [null];
      controls.amount_currency_val = [null];
    }
    this.getPayments(priceIndex).push(this.fb.group(controls));
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

  changeAmountCur(priceIndex: number, paymentIndex: number, event: any): void {
    // if (event.target.value !== '') {
    //   this.getPayments(priceIndex).at(paymentIndex).get('amount_currency')?.enable();
    //   this.getPayments(priceIndex).at(paymentIndex).get('amount')?.disable();
    // } else {
    //   this.getPayments(priceIndex).at(paymentIndex).get('amount')?.enable();
    //   this.getPayments(priceIndex).at(paymentIndex).get('amount_currency')?.disable();
    // }
    this.getPayments(priceIndex).at(paymentIndex).get('amount')?.setValue('');
    this.getPayments(priceIndex).at(paymentIndex).get('amount_currency')?.setValue('');
  }

  inputAmountCur(priceIndex: number, paymentIndex: number, event: any): void {
    const currency_type = this.getPayments(priceIndex).at(paymentIndex).get('amount_currency_val')?.value;
    let course = 0;
    if (currency_type === 'EUR') {
      course = 43.3;
    }
    if (currency_type === 'USD') {
      course = 41.5;
    }
    if (course > 0) {
      this.getPayments(priceIndex).at(paymentIndex).get('amount')?.setValue((event.target.value * course));
    }
  }

  submit():void {
    if (this.form.status === 'VALID') {
      const valueObj: any = this.form.value;
      valueObj.parent_id = this.id;
      this.pendingModal = true;
      this.service.update(valueObj).subscribe((data: PaymentFormInterfaceRequest) => {
        if (data.success !== undefined) {
          if (data.success == true) {
            if (data.data !== undefined) {
              alert('Дані успішно додано');
              this.pendingModal = false;
              this.modalState.emit(false);
            }
          } else {
            this.pendingModal = false;
            alert('Помилка');
          }
        }
      });
    }
  }
}
