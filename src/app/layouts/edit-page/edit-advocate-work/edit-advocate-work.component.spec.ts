import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvocateWorkComponent } from './edit-advocate-work.component';

describe('EditAdvocateWorkComponent', () => {
  let component: EditAdvocateWorkComponent;
  let fixture: ComponentFixture<EditAdvocateWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvocateWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdvocateWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
