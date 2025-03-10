import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLawyerAdvcaseComponent } from './edit-lawyer-advcase.component';

describe('EditLawyerAdvcaseComponent', () => {
  let component: EditLawyerAdvcaseComponent;
  let fixture: ComponentFixture<EditLawyerAdvcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLawyerAdvcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLawyerAdvcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
