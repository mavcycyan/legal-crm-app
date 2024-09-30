import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocatePageComponent } from './advocate-page.component';

describe('AdvocatePageComponent', () => {
  let component: AdvocatePageComponent;
  let fixture: ComponentFixture<AdvocatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
