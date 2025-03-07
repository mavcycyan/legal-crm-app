import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvocateClientComponent } from './edit-advocate-client.component';

describe('EditAdvocateClientComponent', () => {
  let component: EditAdvocateClientComponent;
  let fixture: ComponentFixture<EditAdvocateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvocateClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdvocateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
