import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvocatePageComponent } from './edit-advocate-page.component';

describe('EditAdvocatePageComponent', () => {
  let component: EditAdvocatePageComponent;
  let fixture: ComponentFixture<EditAdvocatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvocatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdvocatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
