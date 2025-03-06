import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCardFilesComponent } from './table-card-files.component';

describe('TableCardFilesComponent', () => {
  let component: TableCardFilesComponent;
  let fixture: ComponentFixture<TableCardFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCardFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCardFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
