import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriberPageComponent } from './edit-subscriber-page.component';

describe('EditSubscriberPageComponent', () => {
  let component: EditSubscriberPageComponent;
  let fixture: ComponentFixture<EditSubscriberPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscriberPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubscriberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
