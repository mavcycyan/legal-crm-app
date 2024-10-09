import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersCardPageComponent } from './subscribers-card-page.component';

describe('SubscribersCardPageComponent', () => {
  let component: SubscribersCardPageComponent;
  let fixture: ComponentFixture<SubscribersCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribersCardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribersCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
