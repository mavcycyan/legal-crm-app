import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateCasePageComponent } from './advocate-case-page.component';

describe('AdvocateCasePageComponent', () => {
  let component: AdvocateCasePageComponent;
  let fixture: ComponentFixture<AdvocateCasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateCasePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateCasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
