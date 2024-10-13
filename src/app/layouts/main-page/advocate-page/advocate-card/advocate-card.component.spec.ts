import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateCardComponent } from './advocate-card.component';

describe('AdvocateCardComponent', () => {
  let component: AdvocateCardComponent;
  let fixture: ComponentFixture<AdvocateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
