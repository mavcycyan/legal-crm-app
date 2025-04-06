import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsArchiveComponent } from './clients-archive.component';

describe('ClientsArchiveComponent', () => {
  let component: ClientsArchiveComponent;
  let fixture: ComponentFixture<ClientsArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
