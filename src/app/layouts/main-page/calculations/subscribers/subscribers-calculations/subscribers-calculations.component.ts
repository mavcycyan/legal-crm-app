import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {
  SubscriberCalculationDataInterface,
  SubscriberCalculationInterface,
  SubscriberCalculationInterfaceRequest,
  SubscriberCalculationResultInterface,
  SubscriberCalculationSubInterface
} from "../../../../../models/calculations/subscriber-calculation-interface";
import {Subscription} from "rxjs";
import {SubscribersCalculationsService} from "../../../../../services/calculations/subscribers-calculations.service";
import {MainService} from "../../../../../services/main/main.service";
import {TablePaymentInterfaceRequest} from "../../../../../models/table/table-payment.interface";
import {animate, style, transition, trigger} from "@angular/animations";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PagiBackService} from "../../../../../services/helper/pagi.back.service";

@Component({
  selector: 'app-subscribers-calculations',
  templateUrl: './subscribers-calculations.component.html',
  styleUrls: ['./subscribers-calculations.component.scss'],
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
export class SubscribersCalculationsComponent implements OnInit, OnDestroy, AfterViewInit{

  // top scroll
  @ViewChild('scrollClone') scrollClone!: ElementRef;
  @ViewChild('scrollContent') scrollContent!: ElementRef;
  @ViewChild('scrollInner') scrollInner!: ElementRef;


  @ViewChild('tableBlock') rightBlockRef!: ElementRef;

  subscribers: SubscriberCalculationSubInterface[] = [];
  calculations: SubscriberCalculationDataInterface[] = [];
  // curMonthCalculations: SubscriberCalculationDataInterface[] = [];
  data: SubscriberCalculationResultInterface[][] = [];
  selectedYear: string = '2025';
  months: string[] = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']

  // modal edit
  subMdl$: Subscription = new Subscription();
  datamodal: boolean = false;
  datamodalStpr: boolean = false;
  pendingModal: boolean = false;
  dataModalInfo: {name: string, month: string, date: string, data: SubscriberCalculationResultInterface} = {
    name: '',
    month: '',
    date: '',
    data: {} as SubscriberCalculationResultInterface
  };
  dataModalStprInfo: {name: string} = {
    name: ''
  }
  isEditModal: boolean = false;
  modalId: number|null = null;
  modalDataSent: boolean = false;
  modalDataStprSent: boolean = false;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    date: new FormControl(''),
    subscriber_id: new FormControl(''),
    chalk: new FormControl(''),
    payments: new FormBuilder().array([]),
  });

  formStpr: FormGroup = new FormGroup({
    id: new FormControl(''),
    stop_reason: new FormControl(''),
  });

  private calcSub$: Subscription = new Subscription();

  constructor(private renderer: Renderer2,
              private fb: FormBuilder,
              private mainService: MainService,
              private subCalcService: SubscribersCalculationsService,
              private pagiBackService: PagiBackService) {}

  ngOnInit() {
    this.pagiBackService.linksDry();
    this.dataLoad();
  }

  dataLoad(): void {
    this.mainService.setPreloaderState(true);
    this.calcSub$ = this.subCalcService.getList().subscribe((data: SubscriberCalculationInterfaceRequest) => {
      this.subscribers = data.data.subscribers;
      this.calculations = data.data.calculations;
      // this.curMonthCalculations = data.data.current_month_data;
      const curMonthNum = new Date().getMonth() + 1;
      this.subscribers.forEach((subscriber: SubscriberCalculationSubInterface, i: number) => {
        // twelve months - 0-11
        this.data[i] = [];
        for (let m = 0; m <= 11; m++) {
          if (m+1 <= curMonthNum) {
            this.data[i][m] = {
              chalk: '',
              payments: [],
              state: (m+1 === curMonthNum) ? 'current' : '',
              inactive: subscriber.inactive,
              subscriber_id: subscriber.id
            }
          } else {
            this.data[i][m] = {
              chalk: '',
              payments: [],
              state: 'empty'
            }
          }
        }
        this.calculations.forEach((calc: SubscriberCalculationDataInterface) => {
          if (subscriber.id === calc.subscriber_id) {
            const m = parseInt(calc.date.split('-')[1]) - 1;
            this.data[i][m].id = calc.id;
            this.data[i][m].subscriber_id = subscriber.id;
            this.data[i][m].inactive = subscriber.inactive;
            this.data[i][m].chalk = calc.chalk;
            this.data[i][m].payments = calc.payments;
          }
        });
        // this.curMonthCalculations.forEach((calc: SubscriberCalculationDataInterface) => {
        //   if (subscriber.id === calc.subscriber_id) {
        //     const m = curMonthNum - 1;
        //     this.data[i][m].subscriber_id = subscriber.id;
        //     this.data[i][m].inactive = subscriber.inactive;
        //     this.data[i][m].chalk = calc.chalk;
        //     this.data[i][m].payments = calc.payments;
        //     this.data[i][m].state = 'current';
        //   }
        // });
      });
      let interval2 = setInterval(() => {
        if (this.rightBlockRef !== undefined && this.data.length > 0) {
          this.setEqualColHeights();
          window.addEventListener('resize', () => this.setEqualColHeights());
          clearInterval(interval2)
          console.log(this.data);
        }
      }, 500)
      this.mainService.setPreloaderState(false);

    });
  }

  dataModalOpen(id: number|null = null, subscriber_id: number|null = null, subscr_num: number|null = null, data_num: number|null = null) {
    if (id !== null) {
      this.isEditModal = true;
      this.modalId = id;
    }
    if (subscriber_id !== null) {
      this.pendingModal = true;
      this.datamodal = true;
      if (subscr_num !== null && data_num !== null) {
        this.dataModalInfo.name = this.subscribers[subscr_num].name;
        this.dataModalInfo.month = this.months[data_num];
        const dateMonthNum = (data_num + 1).toString().padStart(2, '0');
        this.dataModalInfo.date = `${this.selectedYear}-${dateMonthNum}-01`;
        this.dataModalInfo.data = this.data[subscr_num][data_num];
        this.formUpdate();
      }
      this.pendingModal = false;
    }
  }
  dataModalClose(): void {
    if (this.modalDataSent) {
      this.dataLoad();
    }
    this.datamodal = false;
    this.isEditModal = false;
    this.modalDataSent = false;
    this.modalId = null;
    // this.subMdl$.unsubscribe();
  }
  dataModalStprOpen(id: number|undefined, name: string, stop_reason: string|undefined) {
    this.datamodalStpr = true;
    this.pendingModal = true;
    this.dataModalStprInfo = {
      name: name
    }
    const forPatching = {
      id: id,
      stop_reason: stop_reason
    };
    this.formStpr.patchValue(forPatching);
    this.formStpr.updateValueAndValidity();
    this.pendingModal = false;
  }
  dataModalStprClose(): void {
    if (this.modalDataStprSent) {
      this.dataLoad();
    }
    this.datamodalStpr = false;
    this.modalDataStprSent = false;
    this.dataModalStprInfo = {
      name: ''
    }
    // this.subMdl$.unsubscribe();
  }

  get payments_field(): FormArray {
    return (this.form.get('payments') as FormArray) || this.fb.array([]);
  }
  addRepData(): void {
    const workListGroup = this.fb.group({
      date: [''],
      amount: [''],
    });
    this.payments_field.push(workListGroup);
  }
  removeRepData(id: number): void {
    this.payments_field.removeAt(id);
  }

  formUpdate(): void {
    const forPatching: {
      id?: string,
      chalk: string,
      date: string,
      subscriber_id: number|undefined,
      payments?: FormArray<FormControl<any>>
    } = {
      id: '',
      chalk: this.dataModalInfo.data.chalk,
      date: this.dataModalInfo.date,
      subscriber_id: this.dataModalInfo.data.subscriber_id
    };
    if (this.dataModalInfo.data.payments !== undefined && this.dataModalInfo.data.payments.length > 0) {
      const formArray = this.fb.array(
        this.dataModalInfo.data.payments.map((obj: any) => {
            const date = new Date(obj.date);

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // місяці від 0 до 11
            const day = date.getDate().toString().padStart(2, '0');
            return this.fb.group({
              date: [`${year}-${month}-${day}`],
              amount: [obj.amount]
            })
          }
        )
      );
      this.form.setControl('payments', formArray);
    } else {
      this.form.setControl('payments', this.fb.array([]));
    }
    if (this.modalId !== null) {
      forPatching.id = this.modalId.toString();
    }
    this.form.patchValue(forPatching);
    this.form.updateValueAndValidity();
  }

  submit():void {
    if (this.form.status === 'VALID') {
      const valueObj: any = this.form.value;
      this.mainService.setPreloaderState(true);
      if(this.isEditModal) {
        if(this.modalId !== null) {
          this.pendingModal = true;
          this.subCalcService.update(this.modalId, valueObj).subscribe((response: any) => {
              if (response.success !== undefined) {
                if (response.success == true) {
                  this.modalDataSent = true;
                  this.pendingModal = false;
                  this.dataModalClose();
                }
              }
            },
            (error: any) => {
              alert(error);
              this.pendingModal = false;
              this.dataModalClose();
            })
        }
      } else {
        this.pendingModal = true;
        this.subCalcService.save(valueObj).subscribe((response: any) => {
            if (response.success !== undefined) {
              if (response.success == true) {
                this.modalDataSent = true;
                this.pendingModal = false;
                this.dataModalClose();
              }
            }
          },
          (error: any) => {
            alert(error);
            this.pendingModal = false;
            this.dataModalClose();
          })
      }
    }
  }

  submitStpr():void {
    if (this.form.status === 'VALID') {
      const valueObj: any = this.formStpr.value;
      this.mainService.setPreloaderState(true);
      this.pendingModal = true;
      this.subCalcService.stopReasonUpdate(valueObj.id, valueObj).subscribe((response: any) => {
          if (response.success !== undefined) {
            if (response.success == true) {
              this.modalDataStprSent = true;
              this.pendingModal = false;
              this.dataModalStprClose();
            }
          }
        },
        (error: any) => {
          alert(error);
          this.pendingModal = false;
          this.dataModalStprClose();
        })
    }
  }
  ngOnDestroy(): void {
    this.calcSub$.unsubscribe();
  }

  ngAfterViewInit() {
    let interval = setInterval(() => {
      if (this.scrollContent !== undefined) {
        const contentWidth = this.scrollContent.nativeElement.scrollWidth;
        this.scrollInner.nativeElement.style.width = `${contentWidth}px`;
        clearInterval(interval)
      }
    }, 500)
  }
  syncScroll(source: 'clone' | 'content') {
    const clone = this.scrollClone.nativeElement;
    const content = this.scrollContent.nativeElement;

    if (source === 'clone') {
      content.scrollLeft = clone.scrollLeft;
    } else {
      clone.scrollLeft = content.scrollLeft;
    }
  }
  setEqualColHeights(): void {
    const rightBlock = this.rightBlockRef.nativeElement as HTMLElement;

    const cols = document.querySelectorAll('.resize_col');
    let maxHeight = 0;

    cols.forEach(col => {
      this.renderer.setStyle(col, 'height', 'auto');
    });

    cols.forEach(col => {
      if (col.clientHeight > maxHeight) {
        maxHeight = col.clientHeight;
      }
    });

    cols.forEach(col => {
      this.renderer.setStyle(col, 'height', `${maxHeight}px`);
    });
  }
}
