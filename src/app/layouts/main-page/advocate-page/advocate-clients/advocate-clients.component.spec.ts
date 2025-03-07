import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateClientsComponent } from './advocate-clients.component';

describe('AdvocateClientsComponent', () => {
  let component: AdvocateClientsComponent;
  let fixture: ComponentFixture<AdvocateClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
