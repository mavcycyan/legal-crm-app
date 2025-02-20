import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberWorkCardComponent } from './subscriber-work-card.component';

describe('SubscriberWorkCardComponent', () => {
  let component: SubscriberWorkCardComponent;
  let fixture: ComponentFixture<SubscriberWorkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberWorkCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberWorkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
