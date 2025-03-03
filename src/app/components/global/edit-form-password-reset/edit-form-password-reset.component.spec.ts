import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormPasswordResetComponent } from './edit-form-password-reset.component';

describe('EditFormPasswordResetComponent', () => {
  let component: EditFormPasswordResetComponent;
  let fixture: ComponentFixture<EditFormPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormPasswordResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
