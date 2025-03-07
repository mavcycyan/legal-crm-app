import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateClientCardComponent } from './advocate-client-card.component';

describe('AdvocateClientCardComponent', () => {
  let component: AdvocateClientCardComponent;
  let fixture: ComponentFixture<AdvocateClientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateClientCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateClientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
