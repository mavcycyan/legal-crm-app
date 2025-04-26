import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersCalculationsComponent } from './subscribers-calculations.component';

describe('SubscribersCalculationsComponent', () => {
  let component: SubscribersCalculationsComponent;
  let fixture: ComponentFixture<SubscribersCalculationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribersCalculationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribersCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
