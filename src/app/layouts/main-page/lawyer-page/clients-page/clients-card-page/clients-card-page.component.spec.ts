import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCardPageComponent } from './clients-card-page.component';

describe('ClientsCardPageComponent', () => {
  let component: ClientsCardPageComponent;
  let fixture: ComponentFixture<ClientsCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsCardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
