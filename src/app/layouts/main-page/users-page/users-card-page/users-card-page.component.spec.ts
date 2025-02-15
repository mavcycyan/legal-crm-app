import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCardPageComponent } from './users-card-page.component';

describe('UsersCardPageComponent', () => {
  let component: UsersCardPageComponent;
  let fixture: ComponentFixture<UsersCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
