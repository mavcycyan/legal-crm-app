import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateSubcategoriesComponent } from './advocate-subcategories.component';

describe('AdvocateSubcategoriesComponent', () => {
  let component: AdvocateSubcategoriesComponent;
  let fixture: ComponentFixture<AdvocateSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateSubcategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
