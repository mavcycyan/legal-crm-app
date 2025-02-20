import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWorkCardComponent } from './client-work-card.component';

describe('ClientWorkCardComponent', () => {
  let component: ClientWorkCardComponent;
  let fixture: ComponentFixture<ClientWorkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientWorkCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientWorkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
