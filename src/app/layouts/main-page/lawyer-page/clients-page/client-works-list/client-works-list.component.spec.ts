import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWorksListComponent } from './client-works-list.component';

describe('ClientWorksListComponent', () => {
  let component: ClientWorksListComponent;
  let fixture: ComponentFixture<ClientWorksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientWorksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientWorksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
