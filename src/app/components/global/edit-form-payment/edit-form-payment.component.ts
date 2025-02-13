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

  priceList: PaymentFormInterface[] = [];
  form: FormGroup = {} as FormGroup;
  pendingModal: boolean = false;
  constructor(private service: ClientWorkPaymentsService,
              private fb: FormBuilder) {
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
          if (price.payments && price.payments.length > 0) {
            return this.fb.group({
              id: [price.id, Validators.required],
              price: [price.price, [Validators.required]],
              payments: this.fb.array(price.payments.map((payment: PaymentFormPayInterface) => {
                return this.fb.group({
                  id: [payment.id, Validators.required],
                  amount: [payment.amount, [Validators.required]],
                  date: [payment.date]
                })
              }))
            })
          } else {
            return this.fb.group({
              id: [price.id, Validators.required],
              price: [price.price, [Validators.required]],
              payments: this.fb.array([])
            })
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
    this.prices.push(this.fb.group({
      id: [null],
      price: [null, [Validators.required, Validators.min(1)]],
      payments: this.fb.array([])
    }));
  }

  removePrice(index: number) {
    this.prices.removeAt(index);
  }

  addPayment(priceIndex: number) {
    this.getPayments(priceIndex).push(this.fb.group({
      id: [null],
      amount: [null, [Validators.required, Validators.min(1)]],
      date: [null]
    }));
  }

  removePayment(priceIndex: number, paymentIndex: number) {
    this.getPayments(priceIndex).removeAt(paymentIndex);
  }

  submit():void {
    if (this.form.status === 'VALID') {
      const valueObj: any = this.form.value;
      valueObj.client_work_id = this.id;
      this.service.update(valueObj).subscribe((data: PaymentFormInterfaceRequest) => {
        console.log(data);
      });
    }
  }
}
