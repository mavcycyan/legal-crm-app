import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormPaymentComponent } from './edit-form-payment.component';

describe('EditFormPaymentComponent', () => {
  let component: EditFormPaymentComponent;
  let fixture: ComponentFixture<EditFormPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
