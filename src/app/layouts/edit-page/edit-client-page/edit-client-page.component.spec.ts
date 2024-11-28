import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientPageComponent } from './edit-client-page.component';

describe('EditClientPageComponent', () => {
  let component: EditClientPageComponent;
  let fixture: ComponentFixture<EditClientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClientPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
