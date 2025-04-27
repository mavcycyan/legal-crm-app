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

@Component({
  selector: 'app-subscribers-calculations',
  templateUrl: './subscribers-calculations.component.html',
  styleUrls: ['./subscribers-calculations.component.scss']
})
export class SubscribersCalculationsComponent implements OnInit, OnDestroy, AfterViewInit{

  // top scroll
  @ViewChild('scrollClone') scrollClone!: ElementRef;
  @ViewChild('scrollContent') scrollContent!: ElementRef;
  @ViewChild('scrollInner') scrollInner!: ElementRef;


  @ViewChild('tableBlock') rightBlockRef!: ElementRef;

  subscribers: SubscriberCalculationSubInterface[] = [];
  calculations: SubscriberCalculationDataInterface[] = [];
  curMonthCalculations: SubscriberCalculationDataInterface[] = [];
  data: SubscriberCalculationResultInterface[][] = [];
  selectedYear: string = '2025';
  months: string[] = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']

  private calcSub$: Subscription = new Subscription();

  constructor(private renderer: Renderer2,
              private mainService: MainService,
              private subCalcService: SubscribersCalculationsService) {}

  ngOnInit() {
    this.mainService.setPreloaderState(true);
    this.calcSub$ = this.subCalcService.getList().subscribe((data: SubscriberCalculationInterfaceRequest) => {
      this.subscribers = data.data.subscribers;
      this.calculations = data.data.calculations;
      this.curMonthCalculations = data.data.current_month_data;
      const curMonthNum = new Date().getMonth() + 1;
      this.subscribers.forEach((subscriber: SubscriberCalculationSubInterface, i: number) => {
        // twelve months - 0-11
        this.data[i] = [];
        for (let m = 0; m <= 11; m++) {
          if (m+1 < curMonthNum) {
            this.data[i][m] = {
              chalk: '',
              payments: [],
              state: ''
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
            this.data[i][m].chalk = calc.chalk;
            this.data[i][m].payments = calc.payments;
          }
        });
        this.curMonthCalculations.forEach((calc: SubscriberCalculationDataInterface) => {
          if (subscriber.id === calc.subscriber_id) {
            const m = curMonthNum - 1;
            this.data[i][m].subscriber_id = subscriber.id;
            this.data[i][m].chalk = calc.chalk;
            this.data[i][m].payments = calc.payments;
            this.data[i][m].state = 'current';
          }
        });
      });
      this.mainService.setPreloaderState(false);
    });
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
    let interval2 = setInterval(() => {
      if (this.rightBlockRef !== undefined) {
        this.setEqualColHeights();
        window.addEventListener('resize', () => this.setEqualColHeights());
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

    const cols = rightBlock.querySelectorAll('.resize_col');
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
