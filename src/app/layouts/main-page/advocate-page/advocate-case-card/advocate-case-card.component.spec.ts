import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateCaseCardComponent } from './advocate-case-card.component';

describe('AdvocateCaseCardComponent', () => {
  let component: AdvocateCaseCardComponent;
  let fixture: ComponentFixture<AdvocateCaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateCaseCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateCaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
