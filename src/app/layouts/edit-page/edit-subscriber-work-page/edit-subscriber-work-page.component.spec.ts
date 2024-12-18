import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriberWorkPageComponent } from './edit-subscriber-work-page.component';

describe('EditSubscriberWorkPageComponent', () => {
  let component: EditSubscriberWorkPageComponent;
  let fixture: ComponentFixture<EditSubscriberWorkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscriberWorkPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubscriberWorkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
