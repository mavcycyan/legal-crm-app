import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateCategoriesComponent } from './advocate-categories.component';

describe('AdvocateCategoriesComponent', () => {
  let component: AdvocateCategoriesComponent;
  let fixture: ComponentFixture<AdvocateCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
