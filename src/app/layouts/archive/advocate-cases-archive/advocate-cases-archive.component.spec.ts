import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateCasesArchiveComponent } from './advocate-cases-archive.component';

describe('AdvocateCasesArchiveComponent', () => {
  let component: AdvocateCasesArchiveComponent;
  let fixture: ComponentFixture<AdvocateCasesArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateCasesArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateCasesArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
