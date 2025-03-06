import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormFilesComponent } from './edit-form-files.component';

describe('EditFormFilesComponent', () => {
  let component: EditFormFilesComponent;
  let fixture: ComponentFixture<EditFormFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
