import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvocateCategoryComponent } from './edit-advocate-category.component';

describe('EditAdvocateCategoryComponent', () => {
  let component: EditAdvocateCategoryComponent;
  let fixture: ComponentFixture<EditAdvocateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvocateCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdvocateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
