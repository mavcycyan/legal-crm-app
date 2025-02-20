import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateWorksCardComponent } from './advocate-works-card.component';

describe('AdvocateWorksCardComponent', () => {
  let component: AdvocateWorksCardComponent;
  let fixture: ComponentFixture<AdvocateWorksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateWorksCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateWorksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
