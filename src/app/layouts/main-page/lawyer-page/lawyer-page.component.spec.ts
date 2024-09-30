import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerPageComponent } from './lawyer-page.component';

describe('LawyerPageComponent', () => {
  let component: LawyerPageComponent;
  let fixture: ComponentFixture<LawyerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
