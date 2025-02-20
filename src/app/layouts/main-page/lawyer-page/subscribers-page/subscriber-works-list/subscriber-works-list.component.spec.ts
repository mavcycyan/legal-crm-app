import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberWorksListComponent } from './subscriber-works-list.component';

describe('SubscriberWorksListComponent', () => {
  let component: SubscriberWorksListComponent;
  let fixture: ComponentFixture<SubscriberWorksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberWorksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberWorksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
