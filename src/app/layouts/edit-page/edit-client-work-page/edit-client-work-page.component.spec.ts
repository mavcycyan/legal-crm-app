import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientWorkPageComponent } from './edit-client-work-page.component';

describe('EditClientWorkPageComponent', () => {
  let component: EditClientWorkPageComponent;
  let fixture: ComponentFixture<EditClientWorkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClientWorkPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClientWorkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
