import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvocateCaseComponent } from './edit-advocate-case.component';

describe('EditAdvocateCaseComponent', () => {
  let component: EditAdvocateCaseComponent;
  let fixture: ComponentFixture<EditAdvocateCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvocateCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdvocateCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
